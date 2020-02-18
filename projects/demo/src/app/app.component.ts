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
  public Contexts: any[];

  title = 'demo';

  Config: LazyElementConfig = {
    Assets: ['assets/lcu-state.lcu.js'],
    ElementName: 'lcu-state-config-manager-element'
  };

     // Context = null;

  constructor() {
    this.Contexts = [];
  }

  ngOnInit() {
    // setTimeout(() => {
    // this.Config.Assets = ['assets/lazy-element-x.js'];

    // this.Config.ElementName = 'lcu-lazy-element-x';

    // this.Data = { title: 'Working out' };

    //   setTimeout(() => {
    //   }, 5000);
    // }, 5000);

    // this.Contexts.push({
    //   State: {
    //     Content: 'Hello World',
    //     Type: 'h1',
    //     Class: 'this-world'
    //   }
    // });

    // this.Contexts.push({
    //   State: {
    //     Content: 'http://fathym.com',
    //     Type: 'iframe',
    //     Class: 'that-world',
    //     Modifier: `frameborder="0"`
    //   }
    // });

    // this.Config.Assets = ['assets/lcu-applications.lcu.js'];

    // this.Config.ElementName = 'lcu-content-element';

    // this.Context = this.Contexts[0];
  }
}
