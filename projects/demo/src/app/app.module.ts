import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LazyElementModule } from '@lowcodeunit/lazy-element';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LazyElementModule],
  schemas: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
