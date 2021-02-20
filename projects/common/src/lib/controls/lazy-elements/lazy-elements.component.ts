import {
  Component,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { LCUServiceSettings } from '@lcu/common';
import { LazyElementConfig } from '../../core/lazy-element-config';

@Component({
  selector: 'lcu-lazy-elements',
  templateUrl: './lazy-elements.component.html',
  styleUrls: ['./lazy-elements.component.scss'],
})
export class LazyElementsComponent implements OnChanges, OnInit {
  //  Fields

  //  Properties
  @Input('configs')
  public Configs: { [key: string]: LazyElementConfig };

  @Input('elements')
  public Elements: { [elCfg: string]: string };

  public Names: string[];

  //  Constructors
  constructor(
    protected injector: Injector,
    protected settings: LCUServiceSettings
  ) {}

  //  Life Cycle
  public ngOnChanges() {
    this.ensureNames();
  }

  public ngOnInit() {
    this.ensureNames();
  }

  //  API Methods
  public LoadContext(name: string) {
    const stateKey = this.Elements[name];

    return stateKey ? this.settings.State[stateKey] : null;
  }

  //  Helpers
  protected ensureNames() {
    this.Names = Object.keys(this.Elements || {});

    if (!(this.Names?.length > 0)) {
      this.Names = Object.keys(this.Configs || {});
    }
  }
}
