import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChifoumiComponent } from './chifoumi/chifoumi.component';


@NgModule({
  declarations: [
    AppComponent,
    ChifoumiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
