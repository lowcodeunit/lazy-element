import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LazyElementModule, LazyElementComponent } from '@lowcodeunit/lazy-element';

@NgModule({
  declarations: [],
  imports: [BrowserModule, LazyElementModule],
  providers: [],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  //  Constructors
  constructor(protected injector: Injector) {
  }

  //  Life Cycle
  public ngDoBootstrap() {
    const panel = createCustomElement(LazyElementComponent, { injector: this.injector });

    customElements.define('lcu-lazy-element', panel);
  }
}
