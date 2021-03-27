import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionStatus, IMission, IUser } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-mission-user',
	templateUrl: './mission-user.component.html',
	styleUrls: ['./mission-user.component.scss']
})
export class MissionUserComponent implements OnInit {

	// Usuario conectado
	private conectedUser: IUser;

	// Admins conectados
	public adminUsersConected: IUser[];

	// Misiones del usuario conectado
	public missionsRunByTheUserConected: IMission[];

	// Flags
	public loading: boolean = true;

	// Admin encargado del retiro
	public userInChargeOfWithdrawal: IUser;


	constructor(private session: SessionService, private dbUser: UserService, private toastr: ToastrService, private router: Router) { }

	ngOnInit(): void {
		this.getConectedUser();
		this.getAdminUser();
	}

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
			this.getMissionsRunByTheUserConected();
			this.loading = false;
		});
	}

	private getMissionsRunByTheUserConected(): void {
		this.missionsRunByTheUserConected = this.conectedUser.currentMissions;
	}

	private async getAdminUser(): Promise<void> {
		let adminUser$ = await this.dbUser.getAdminUser();
		adminUser$.valueChanges().subscribe(users => {
			this.adminUsersConected = [];
			for (let user of users) {
				if ((user as IUser).connectionStatus == ConnectionStatus.Conectado)
					this.adminUsersConected.push(user as IUser);
			}
		})
	}

}
