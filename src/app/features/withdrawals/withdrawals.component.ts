import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionStatus, IUser, IWithdrawRequest, RequestType, StateOfWithdrawRequest } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-withdrawals',
	templateUrl: './withdrawals.component.html',
	styleUrls: ['./withdrawals.component.scss']
})
export class WithdrawalsComponent implements OnInit {

	// Usuario Conectado
	private conectedUser: IUser;

	// Admins conectados
	public adminUsersConected: IUser[];

	// Cantidad a retirar
	public quantityToWithdraw: number;

	// Admin encargado del retiro
	public userInChargeOfWithdrawal: IUser;

	// Loading
	public loading: boolean = true;

	constructor( private session: SessionService, private dbUser: UserService, private router: Router, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.getConectedUser();
		this.getAdminUser();
	}

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
			this.loading = false;
		});
	}

	private async getAdminUser(): Promise<void> {
		let adminUser$ = await this.dbUser.getAdminUser();
		adminUser$.valueChanges().subscribe(users => {
			this.adminUsersConected = [];
			for(let user of users){
				if((user as IUser).connectionStatus == ConnectionStatus.Conectado)
					this.adminUsersConected.push(user as IUser);
			}
		})
	}

	public checkFieldsForWithdrawal(): boolean {
		if(this.userInChargeOfWithdrawal && this.quantityToWithdraw){
			if(this.conectedUser.money >= this.quantityToWithdraw && this.quantityToWithdraw > 0)
				return true;
		}
		else
			return false;
	}

	public withdrawalsOfUser(): void {
		let withdrawRequest: IWithdrawRequest = {
			itemRequest: this.quantityToWithdraw,
			userWhoSent: this.conectedUser.nameInGame,
			userWhoReceiving: this.userInChargeOfWithdrawal.nameInGame,
			state: StateOfWithdrawRequest.Pendiente,
			requestDate: new Date(),
			requestType: RequestType.Money
		} 
		
		this.userInChargeOfWithdrawal.withdrawRequest.push(withdrawRequest);
		this.conectedUser.withdrawRequest.push(withdrawRequest);
		this.conectedUser.money -= this.quantityToWithdraw;
		
		this.loading = true;
		this.dbUser.modify(this.userInChargeOfWithdrawal)
			.then(() => {
				this.dbUser.modify(this.conectedUser)
					.then(() => {
						this.toastr.success('ahora espera el admin a cargo de tu retiro.', 'Perfecto!',  {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
					})
					.catch(() => {
						this.toastr.error('Contacte con algún líder de la banda', 'Error en el retiro', {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
					})
			})
			.catch(() => {
				this.toastr.error('Error en el retiro', 'Contacte con algún líder de la banda', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
			.finally(() => {
				this.router.navigate(['']);
				this.loading = false;
			})
	}
	public backToTop(): void {
		this.router.navigate(['']);
	}
}
