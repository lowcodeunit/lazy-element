import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
} from '@angular/core';
import { LazyElementConfig } from '../../core/lazy-element-config';

@Component({
  selector: 'lcu-lazy-element',
  templateUrl: './lazy-element.component.html',
  styleUrls: ['./lazy-element.component.scss'],
})
export class LazyElementComponent
  implements AfterViewChecked, OnChanges, OnInit {
  //  Fields
  protected get childEls(): HTMLElement[] {
    return [].slice.call(this.native.children);
  }

  protected get headScripts(): HTMLScriptElement[] {
    return [].slice.call(document.querySelectorAll('script'));
  }

  protected get headStyles(): HTMLLinkElement[] {
    return [].slice.call(document.querySelectorAll('link'));
  }

  protected get native(): HTMLElement {
    return this.el.nativeElement;
  }

  //  Properties
  @Input('config')
  public Config: LazyElementConfig;

  @Input('context')
  public Context: any;

  //  Constructors
  constructor(protected el: ElementRef) {}

  //  Life Cycle
  public ngAfterViewChecked() {}

  public ngOnChanges(_: SimpleChanges) {
    if (_['Config']) {
      if (
        _['Config'].previousValue &&
        _['Config'].previousValue.ElementName !==
          _['Config'].currentValue.ElementName
      ) {
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
    const els = this.childEls.filter(
      (cn) => cn.nodeName === this.Config.ElementName.toUpperCase()
    );

    if (els) {
      els.forEach((el) => this.native.removeChild(el));
    }
  }

  protected configureElement() {
    const el = this.ensureDomElement();

    this.ensureElementConfigured(el);
  }

  protected ensureScript(
    scripts: HTMLScriptElement[],
    asset: string,
    elName: string
  ) {
    let script = scripts.find((sc) => {
      const srcAttr = sc.getAttributeNode('src');

      return srcAttr && srcAttr.nodeValue === asset;
    }); // && sc.className === elName);

    if (!script) {
      script = document.createElement('script');

      script.src = asset;

      script.className = elName;

      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }

  protected ensureStyle(
    styles: HTMLLinkElement[],
    asset: string,
    elName: string
  ) {
    let style = styles.find((st) => {
      const hrefAttr = st.getAttributeNode('href');

      return hrefAttr && hrefAttr.nodeValue === asset;
    }); // && sc.className === elName);

    if (!style) {
      style = document.createElement('link');

      style.href = asset;

      style.rel = 'stylesheet';

      style.className = elName;

      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  protected establishElement() {
    if (this.Config) {
      // const scripts = this.headScripts.filter(
      //   cn => cn.className === this.Config.ElementName
      // );

      const scripts = this.Config?.Scripts || this.Config?.Assets;

      scripts?.forEach((asset) =>
        this.ensureScript(this.headScripts, asset, this.Config.ElementName)
      );

      this.Config?.Styles?.forEach((asset) =>
        this.ensureStyle(this.headStyles, asset, this.Config.ElementName)
      );

      setTimeout(() => {
        this.configureElement();
      }, 1000);
    }
  }

  protected ensureDomElement() {
    //  TODO:  How to allow content projection to show until js is loaded?

    let el = this.childEls.find(
      (cn) => cn.nodeName === this.Config.ElementName.toUpperCase()
    );

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

    const ctxt = this.transformContext();

    if (el['SetContext']) {
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
