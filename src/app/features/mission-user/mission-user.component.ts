import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionStatus, IMission, IUser, IWithdrawRequest, missionState, StateOfWithdrawRequest } from 'src/app/core/entities';
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

	// Cupos para Misiones
	public firstPlaceAvailable: IMission;
	public secondPlaceAvailable: IMission;
	public thirdPlaceAvailable: IMission;

	// Lista de misiones con solicitud de entrega.
	public listOfMissionsWithDeliveryRequest: IMission [];

	//Solicitud de entrega
	public deliveryRequest: boolean = false;

	// Mision por entregar
	public missionToDeliver: IMission;

	// Flags
	public loading: boolean = true;

	// Admin encargado de la solicitud de entrega
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
		let index: number = 0;
		this.missionsRunByTheUserConected = this.conectedUser.currentMissions;
		this.listOfMissionsWithDeliveryRequest = [];

		for(let mission of this.missionsRunByTheUserConected){
			if(index == 0){
				if(mission.state == missionState.started){
					this.firstPlaceAvailable = mission;
					index++
				}
				else
					this.listOfMissionsWithDeliveryRequest.push(mission);
			}
			else if(index == 1){
				if(mission.state == missionState.started){
					this.secondPlaceAvailable = mission;
					index++
				}
				else
					this.listOfMissionsWithDeliveryRequest.push(mission);
			}
			else if(index == 2){
				if(mission.state == missionState.started){
					this.thirdPlaceAvailable = mission;
					break;
				}
				else
					this.listOfMissionsWithDeliveryRequest.push(mission);
			}
		}

		if(this.listOfMissionsWithDeliveryRequest.length == 0){
			this.listOfMissionsWithDeliveryRequest = undefined;
		}
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

	public performMissionDelivery(mission: IMission): void {
		this.missionToDeliver = mission;
		this.deliveryRequest = true
	}

	public confirmedPerformMissionDelivery(): void {
		for(let i=0; i<this.conectedUser.currentMissions.length; i++){
			if(this.conectedUser.currentMissions[i] == this.missionToDeliver){
				this.conectedUser.currentMissions[i].state = missionState.finished;
				this.conectedUser.currentMissions[i].closeDate = new Date();
				break;
			}
		}

		let withdrawRequest: IWithdrawRequest = {
			itemRequest: this.missionToDeliver,
			userWhoSent: this.conectedUser.nameInGame, // el usuario conectado solicita la entrega
			userWhoReceiving: this.userInChargeOfWithdrawal.nameInGame, // admin conectado para entregar mision
			state: StateOfWithdrawRequest.Pendiente,
			requestDate: new Date()
		} 

		this.userInChargeOfWithdrawal.withdrawRequest.push(withdrawRequest);

		this.dbUser.modify(this.userInChargeOfWithdrawal)
		.then(() => {
			this.dbUser.modify(this.conectedUser)
				.then(() => {
					this.toastr.success('ahora espera el admin a cargo de tu entrega.', 'Perfecto!',  {
						timeOut: 4000,
						positionClass: 'toast-bottom-right',
					});
					switch(this.missionToDeliver){
						case this.firstPlaceAvailable:
							this.firstPlaceAvailable = undefined;
							break;
						case this.secondPlaceAvailable:
							this.secondPlaceAvailable = undefined;
							break;
						case this.thirdPlaceAvailable:
							this.thirdPlaceAvailable = undefined;
							break;
					}
				})
				.catch(() => {
					this.toastr.error('Contacte con algún líder de la banda', 'Error en la entrega', {
						timeOut: 4000,
						positionClass: 'toast-bottom-right',
					});
				})
		})
		.catch(() => {
			this.toastr.error('Error en el entrega', 'Contacte con algún líder de la banda', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		})
		.finally(() => {
			this.deliveryRequest = false;
			this.loading = false;
		})
		
	}
	
	public backToTop(): void {
		this.router.navigate(['']);
	}


}
