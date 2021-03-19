import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouletteComponent } from './fetures/roulette/roulette.component';

const routes: Routes = [
  {path: 'roulette', component: RouletteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
