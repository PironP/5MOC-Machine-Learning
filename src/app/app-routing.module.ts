import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ChifoumiComponent } from './chifoumi/chifoumi.component';
import { GameSearchComponent } from './game-search/game-search.component';
import { Routeguard } from './routeguard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
      path: 'game',
      component: ChifoumiComponent,
      canActivate: [Routeguard]
  },
  {
      path: 'search',
      component: GameSearchComponent,
  },
  {
      path: 'help',
      component: ChifoumiComponent, // TO UPDATE
  },
  {
      path: '**',
      redirectTo: '/',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
