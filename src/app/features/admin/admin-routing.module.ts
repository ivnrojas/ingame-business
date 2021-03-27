import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { MissionAddComponent } from './mission/mission-add/mission-add.component';
import { MissionListComponent } from './mission/mission-list/mission-list.component';
import { MissionModifyComponent } from './mission/mission-modify/mission-modify.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
	{
		path: '', component: AdminComponent, children: [
			{ path: 'home', component: HomeadminComponent},
			{ path: 'user', children: [
				{ path: '', component: UserListComponent },
				{ path: 'add', component: UserAddComponent },
			]},
			{ path: 'mission', children: [
				{ path: '', component: MissionListComponent },
				{ path: 'add', component: MissionAddComponent },
				{ path: 'modify', component: MissionModifyComponent },
			]},		
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
