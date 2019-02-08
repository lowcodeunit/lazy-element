import { Component, OnInit, ElementRef } from '@angular/core';
import { LazyElementConfig } from '@lowcodeunit/lazy-element';
import { NgElement, WithProperties } from '@angular/elements';

declare global {
  interface HTMLElementTagNameMap {
    'lcu-lazy-element-x': NgElement & WithProperties<{ data: any }>;
  }
}

@Component({
  selector: 'lib-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';

  Config: LazyElementConfig = {
    Assets: ['assets/lazy-element-x.js'],
    ElementName: 'lcu-lazy-element-x'
  };

  Data = null;

  ngOnInit() {
    setTimeout(() => {
      this.Config.Assets = ['assets/flux-module-panel.js'];

      this.Config.ElementName = 'flux-module-panel';

      this.Data = { title: 'Working out' };
    }, 5000);
  }
}
