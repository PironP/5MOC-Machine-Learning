import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChifoumiComponent } from './chifoumi/chifoumi.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
      path: 'game',
      component: ChifoumiComponent,
  },
  {
      path: 'search',
      component: ChifoumiComponent, // TO UPDATE
  },
  {
      path: 'help',
      component: ChifoumiComponent, // TO UPDATE
  },
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: '/home',
  },
];


@NgModule({
  declarations: [
    AppComponent,
    ChifoumiComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
