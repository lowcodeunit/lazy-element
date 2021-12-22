//  TODO:  Is this hosted standalone anywhere?
//  https://raw.githubusercontent.com/Toxicable/angular/798ce0b5288c7a8b522d1ca710a4f64e427e931c/packages/common/src/pipes/push_pipe.ts

import { Pipe, PipeTransform, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

// 90% the same as the async pipe
// https://github.com/angular/angular/blob/master/packages/common/src/pipes/async_pipe.ts

@Pipe({ name: 'push', pure: false })
export class PushPipe implements PipeTransform, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {
    NgZone.assertNotInAngularZone();
  }

  private obs: Observable<any>;
  private sub: Subscription;
  private value: any = null;
  private lastReturnedValue: any = null;

  transform<T>(obs: Observable<T>): any {
    if (!this.obs) {
      this.obs = obs;
      this.sub = obs.subscribe(value => {
        this.value = value;
        this.cdr.detectChanges();
      });
      this.lastReturnedValue = this.value;
      return this.value;
    }

    if (this.obs !== obs) {
      this.dispose();
      this.transform(obs);
    }
    if (this.value === this.lastReturnedValue) {
      return this.lastReturnedValue;
    }
    this.lastReturnedValue = this.value;

    return this.value;
  }
  ngOnDestroy() {
    this.dispose();
  }
  dispose() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
      this.obs = null;
      this.lastReturnedValue = null;
      this.value = null;
    }
  }
}
