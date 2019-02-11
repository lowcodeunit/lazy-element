import { Component, OnInit, ViewEncapsulation, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LazyElementConfig } from '../../core/lazy-element-config';

@Component({
  selector: 'lcu-lazy-element',
  templateUrl: './lazy-element.component.html',
  styleUrls: ['./lazy-element.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LazyElementComponent implements OnChanges, OnInit {
  //  Fields
  protected get headScripts(): HTMLScriptElement[] {
    return [].slice.call(document.querySelectorAll('script'));
  }

  protected get childEls(): HTMLElement[] {
    return [].slice.call(this.native.children);
  }

  protected get native(): HTMLElement {
    return this.el.nativeElement;
  }

  protected localContext: any;

  //  Properties
  @Input('context')
  public set Context(ctxt: any) {
    //  TODO: WOuld be ideal if this was only caps...
    this.localContext = ctxt;
  }

  public get Context(): any {
    return this.localContext;
  }

  @Input('config')
  public Config: LazyElementConfig;

  //  Constructors
  constructor(protected el: ElementRef) {}

  //  Life Cycle
  public ngOnChanges(_: SimpleChanges) {
    if (_['Config']) {
      if (_['Config'].previousValue && _['Config'].previousValue.ElementName !== _['Config'].currentValue.ElementName) {
        this.clearElement(_['Config'].previousValue);
      }

      this.establishElement();
    } else if (_['Context']) {
      this.configureElement();
    }
  }

  public ngOnInit() {}

  //  Helpers
  protected clearElement(prevConfig: LazyElementConfig) {
    const els = this.childEls.filter(cn => cn.nodeName === this.Config.ElementName.toUpperCase());

    if (els) {
      els.forEach(el => this.native.removeChild(el));
    }
  }

  protected configureElement() {
    const el = this.ensureDomElement();

    this.ensureElementConfigured(el);

    console.log(el);
  }

  protected ensureScript(scripts: HTMLScriptElement[], asset: string, elName: string) {
    let script = scripts.find(sc => sc.getAttributeNode('src').nodeValue === asset && sc.className === elName);

    if (!script) {
      script = document.createElement('script');

      script.src = asset;

      script.className = elName;

      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }

  protected establishElement() {
    if (this.Config) {
      const scripts = this.headScripts.filter(cn => cn.className === this.Config.ElementName);

      this.Config.Assets.forEach(asset => this.ensureScript(scripts, asset, this.Config.ElementName));

      this.configureElement();
    }
  }

  protected ensureDomElement() {
    let el = this.childEls.find(cn => cn.nodeName === this.Config.ElementName.toUpperCase());

    if (!el) {
      el = document.createElement(this.Config.ElementName);

      this.native.appendChild(el);
    }

    return el;
  }

  protected ensureElementConfigured(el: HTMLElement) {
    this.mapElementInputs(el);

    this.mapElementOutputs(el);
  }

  protected mapElementInputs(el: HTMLElement) {
    const ctxt = this.transformContext();

    el['Context'] = ctxt;
  }

  protected mapElementOutputs(el: HTMLElement) {}

  protected transformContext() {
    return this.Context;
  }
}
