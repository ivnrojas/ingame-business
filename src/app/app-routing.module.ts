import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddComponent } from './features/admin/user-add/user-add.component';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { MissionAddComponent } from './features/mission/mission-add/mission-add.component';
import { MissionListComponent } from './features/mission/mission-list/mission-list.component';
import { MissionModifyComponent } from './features/mission/mission-modify/mission-modify.component';
import { RouletteComponent } from './features/roulette/roulette.component';

const routes: Routes = [
    { path: 'roulette', component: RouletteComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'admin', children: [
        { path: 'user', children: [
            { path: '', component: UserListComponent },
            { path: 'add', component: UserAddComponent },
        ] }
    ] },
    {
        path: 'mission', children: [
            { path: '', component: MissionListComponent },
            { path: 'add', component: MissionAddComponent },
            { path: 'modify', component: MissionModifyComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
