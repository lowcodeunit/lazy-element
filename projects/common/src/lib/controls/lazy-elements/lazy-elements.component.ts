import {
  Component,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
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

  @Input('names')
  public Names: string[];

  //  Constructors
  constructor(protected injector: Injector) {}

  //  Life Cycle
  public ngOnChanges() {
    this.ensureNames();
  }

  public ngOnInit() {
    this.ensureNames();
  }

  //  API Methods

  //  Helpers
  protected ensureNames() {
    if (!(this.Names?.length > 0)) {
      this.Names = Object.keys(this.Configs || {});
    }
  }
}
