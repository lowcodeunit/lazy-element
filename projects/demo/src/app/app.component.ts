import { Component, OnInit, ElementRef } from '@angular/core';
import { LazyElementConfig, LazyElementToken } from '@lowcodeunit/lazy-element';
import { NgElement, WithProperties } from '@angular/elements';

declare global {
  interface HTMLElementTagNameMap {
    'lcu-lazy-element-x': NgElement & WithProperties<{ data: any }>;
  }
}

@Component({
  selector: 'lib-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public Contexts: any[];

  title = 'demo';

  Config: LazyElementConfig = {
    Assets: ['assets/lcu-state.lcu.js'],
    ElementName: 'lcu-state-config-manager-element',
  };

  Context = null;

  ElementConfigs = {
    'lcu-device-data-flow-manage-element': {
      Scripts: [
        'https://www.iot-ensemble.com/_lcu/lcu-device-data-flow-lcu/wc/lcu-device-data-flow.lcu.js',
      ],
      Styles: [
        'https://www.iot-ensemble.com/_lcu/lcu-device-data-flow-lcu/wc/lcu-device-data-flow.lcu.css',
      ],
      ElementName: 'lcu-device-data-flow-manage-element',
    },
    'landing-pages-blocks-element': {
      Scripts: [
        'https://www.iot-ensemble.com/_lcu/lcu-landing-pages-lcu/wc/landing-pages.lcu.js',
      ],
      Styles: [
        'https://www.iot-ensemble.com/_lcu/lcu-landing-pages-lcu/wc/landing-pages.lcu.css',
      ],
      ElementName: 'landing-pages-home-page-element',
    },
    'lcu-billing-plan-view-element': {
      Scripts: [
        'https://www.iot-ensemble.com/_lcu/lcu-billing-lcu/wc/lcu-billing.lcu.js',
      ],
      Styles: [],
      ElementName: 'lcu-billing-plan-view-element',
    },
  };

  public ElementTokens: LazyElementToken[] = [
    // {
    //   Name: 'lcu-device-data-flow-manage-element',
    //   StateKey: null,
    // },
    {
      Name: 'lcu-billing-plan-view-element',
      StateKey: 'Billing',
      ActionKeys: {
        'buy-now-click': 'Pricing.BuyNowClick',
      },
    },
    // {
    //   Name: 'landing-pages-blocks-element',
    //   StateKey: 'LandingPages.Blocks',
    // },
  ];

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
