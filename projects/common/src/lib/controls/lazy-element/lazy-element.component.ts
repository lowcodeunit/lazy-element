import { Component, OnInit, ViewEncapsulation, ElementRef, Input, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import { LazyElementConfig } from '../../core/lazy-element-config';

@Component({
  selector: 'lcu-lazy-element',
  templateUrl: './lazy-element.component.html',
  styleUrls: ['./lazy-element.component.scss']
})
export class LazyElementComponent implements AfterViewChecked, OnChanges, OnInit {
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

  //  Properties
  @Input('context')
  public Context: any;

  @Input('config')
  public Config: LazyElementConfig;

  //  Constructors
  constructor(protected el: ElementRef) {}

  //  Life Cycle
  public ngAfterViewChecked() {}

  public ngOnChanges(_: SimpleChanges) {
    if (_['Config']) {
      if (_['Config'].previousValue && _['Config'].previousValue.ElementName !== _['Config'].currentValue.ElementName) {
        this.clearElement(_['Config'].previousValue);
      }

      this.establishElement();
    } else if (_['Context']) {
      setTimeout(() => {
        this.configureElement();
      }, 1000);
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

      setTimeout(() => {
        this.configureElement();
      }, 1000);
    }
  }

  protected ensureDomElement() {
    let el = this.childEls.find(cn => cn.nodeName === this.Config.ElementName.toUpperCase());

    if (!el) {
      el = document.createElement(this.Config.ElementName);

      this.native.appendChild(el);

      // el.innerHTML = `<mat-progress-bar _ngcontent-c10="" aria-valuemax="100" aria-valuemin="0" class="mat-progress-bar mat-primary" mode="indeterminate" role="progressbar" ng-reflect-mode="indeterminate" aria-valuenow="0"><svg class="mat-progress-bar-background mat-progress-bar-element" focusable="false" height="4" width="100%"><defs><pattern height="4" patternUnits="userSpaceOnUse" width="8" x="4" y="0" id="mat-progress-bar-0"><circle cx="2" cy="2" r="2"></circle></pattern></defs><rect height="100%" width="100%" fill="url('/forge#mat-progress-bar-0')"></rect></svg><div class="mat-progress-bar-buffer mat-progress-bar-element"></div><div class="mat-progress-bar-primary mat-progress-bar-fill mat-progress-bar-element" ng-reflect-ng-style="[object Object]" style="transform: scaleX(0);"></div><div class="mat-progress-bar-secondary mat-progress-bar-fill mat-progress-bar-element"></div></mat-progress-bar>`;
    }

    return el;
  }

  protected ensureElementConfigured(el: HTMLElement) {
    console.log(el);

    this.mapElementInputs(el);

    this.mapElementOutputs(el);
  }

  protected mapElementInputs(el: HTMLElement) {
    console.log(el);

    if (el['SetContext']) {
      const ctxt = this.transformContext();

      el['SetContext'](ctxt);

      console.log('Context set');
    } else {
      console.log('Context NOT set');
    }
  }

  protected mapElementOutputs(el: HTMLElement) {}

  protected transformContext() {
    return this.Context;
  }
}
