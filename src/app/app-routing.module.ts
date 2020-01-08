import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ChifoumiComponent } from './chifoumi/chifoumi.component';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }