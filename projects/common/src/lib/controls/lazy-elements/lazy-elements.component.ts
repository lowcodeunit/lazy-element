import {
  Component,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { LCUServiceSettings } from '@lcu/common';
import {
  LazyElementConfig,
  LazyElementToken,
} from '../../core/lazy-element-config';

@Component({
  selector: 'lcu-lazy-elements',
  templateUrl: './lazy-elements.component.html',
  styleUrls: ['./lazy-elements.component.scss'],
})
export class LazyElementsComponent implements OnChanges, OnInit {
  //  Fields

  //  Properties
  public Contexts: { [key: string]: any };

  @Input('configs')
  public Configs: { [key: string]: LazyElementConfig };

  @Input('elements')
  public Elements: LazyElementToken[];

  public Names: string[];

  //  Constructors
  constructor(
    protected injector: Injector,
    protected settings: LCUServiceSettings
  ) {}

  //  Life Cycle
  public ngOnChanges() {
    this.ensureNames();

    this.ensureContexts();
  }

  public ngOnInit() {
    this.ensureNames();

    this.ensureContexts();
  }

  //  API Methods

  //  Helpers
  protected ensureContexts() {
    this.Contexts = {};

    this.Names?.forEach((name) => {
      this.Contexts[name] = this.loadContext(name);
    });

    console.log('Lazy elements contexts:')
    console.log(this.Contexts);
  }

  protected ensureNames() {
    this.Names = this.Elements?.map((el) => el.Name) || [];

    if (!(this.Names?.length > 0)) {
      this.Names = Object.keys(this.Configs || {});
    }

    console.log('Lazy elements names:')
    console.log(this.Names);
  }

  public loadContext(name: string) {
    const stateKey = this.Elements?.find((el) => el.Name === name)?.StateKey;

    return stateKey && this.settings.State ? this.settings.State[stateKey] : null;
  }
}
