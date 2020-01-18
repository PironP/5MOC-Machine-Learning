import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChifoumiComponent } from './chifoumi/chifoumi.component';
import { GameSearchComponent } from './game-search/game-search.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: '127.0.0.1:3000', options: {} };
const config: SocketIoConfig = { url: 'https://chifoumi-server.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ChifoumiComponent,
    GameSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
