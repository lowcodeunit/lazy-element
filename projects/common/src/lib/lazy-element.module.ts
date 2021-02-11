import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyElementComponent } from './controls/lazy-element/lazy-element.component';
import { PushPipe } from './pipes/push-pipe';
import { LazyElementsComponent } from './controls/lazy-elements/lazy-elements.component';

@NgModule({
  declarations: [PushPipe, LazyElementComponent, LazyElementsComponent],
  imports: [CommonModule],
  exports: [PushPipe, LazyElementComponent, LazyElementsComponent],
  entryComponents: [LazyElementComponent]
})
export class LazyElementModule {
  static forRoot(): ModuleWithProviders<LazyElementModule> {
    return {
      ngModule: LazyElementModule,
      providers: [PushPipe]
    };
  }
}
