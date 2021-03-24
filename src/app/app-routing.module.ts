import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RouletteComponent } from './features/roulette/roulette.component';

const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(module => module.AdminModule) }, // canActivate: [AuthGuard, AdminGuard]
    { path: 'cases', component: RouletteComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
