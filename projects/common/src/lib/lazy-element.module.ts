import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyElementComponent } from './controls/lazy-element/lazy-element.component';
import { PushPipe } from './pipes/push-pipe';

@NgModule({
  declarations: [PushPipe, LazyElementComponent],
  imports: [CommonModule],
  exports: [PushPipe, LazyElementComponent],
  entryComponents: [LazyElementComponent]
})
export class LazyElementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LazyElementModule,
      providers: [PushPipe]
    };
  }
}
