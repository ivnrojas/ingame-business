import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionStatus, IMission, IUser, IWithdrawRequest, Levels, MissionState, StateOfWithdrawRequest, RequestType, MissionCategory } from 'src/app/core/entities';
import { MissionsService } from 'src/app/shared/services/missions.service';
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
	public requestWeapon: boolean = false;

	// Mision para solicitar arma
	public missionRequestWeapon: IMission;

	// Admin encargado de la solicitud del arma
	public userInChargeOfWeaponRequest: IUser = undefined;

	// Admin encargado de la solicitud de entrega
	public userInChargeOfWithdrawal: IUser = undefined;

	// Misiones 
	public missions: IMission[];


	constructor(private session: SessionService, private dbUser: UserService, private toastr: ToastrService, private router: Router, private dbMission: MissionsService) { }

	ngOnInit(): void {
		this.getConectedUser();
		this.getAdminUser();
		this.getMissions();
	}

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
			this.getMissionsRunByTheUserConected();
			this.getMissions();	
			this.loading = false;
		});
	}

	private async getMissions(): Promise<void> {
		let mission$ = await this.dbMission.getAll()
			.valueChanges().subscribe(missions => {
			this.missions = missions;
		});
	}

	private getMissionsRunByTheUserConected(): void {
		this.firstPlaceAvailable = undefined;
		this.secondPlaceAvailable = undefined;
		this.thirdPlaceAvailable = undefined;

		let index: number = 0;
		this.missionsRunByTheUserConected = this.conectedUser.currentMissions;
		this.listOfMissionsWithDeliveryRequest = [];

		for(let mission of this.missionsRunByTheUserConected){
			console.log(mission)
			if(index == 0){
				if(mission.state == MissionState.started){
					this.firstPlaceAvailable = mission;
					index++
				}
				else
					this.listOfMissionsWithDeliveryRequest.push(mission);
			}
			else if(index == 1){
				if(mission.state == MissionState.started){
					this.secondPlaceAvailable = mission;
					index++
				}
				else
					this.listOfMissionsWithDeliveryRequest.push(mission);
			}
			else if(index == 2){
				if(mission.state == MissionState.started){
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
				this.conectedUser.currentMissions[i].state = MissionState.finished;
				this.conectedUser.currentMissions[i].closeDate = new Date();
				this.conectedUser.currentMissions[i].userInChargeOfDelivery = this.userInChargeOfWithdrawal.nameInGame;
				break;
			}
		}

		let withdrawRequest: IWithdrawRequest = {
			itemRequest: this.missionToDeliver,
			userWhoSent: this.conectedUser.nameInGame, 
			userWhoReceiving: this.userInChargeOfWithdrawal.nameInGame, 
			state: StateOfWithdrawRequest.Pendiente,
			requestDate: new Date(),
			requestType: RequestType.Mission
		} 

		this.userInChargeOfWithdrawal.withdrawRequest.push(withdrawRequest);

		this.dbUser.modify(this.userInChargeOfWithdrawal)
		.then(() => {
			this.dbUser.modify(this.conectedUser)
				.then(() => {
					this.toastr.success('Ahora espera el admin a cargo de tu entrega.', 'Perfecto!',  {
						timeOut: 4000,
						positionClass: 'toast-bottom-right',
					});
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

	public requestMission(): void{
		switch(this.conectedUser.level.level){
			case Levels[0].level:
			case Levels[1].level:
			case Levels[2].level:
			default:
				let missionsLevelOne = this.getMimsionsAccordingToLevel(1, 5); // determina el rango de niveles de misiones
				let mission = missionsLevelOne[this.random(0, missionsLevelOne.length)];
				mission.state = MissionState.started;
				mission.startDate = new Date();
				if(mission.category != MissionCategory.standard){
					this.missionRequestWeapon = mission;
					this.requestWeapon = true;
				}
				else
					this.conectedUser.currentMissions.push(mission);
					
				break;
		}
		this.dbUser.modify(this.conectedUser)
	}

	public confirmedRequestWeapon(): void {
		this.conectedUser.currentMissions.push(this.missionRequestWeapon);
		
		let withdrawRequest: IWithdrawRequest = {
			itemRequest: this.missionRequestWeapon,
			userWhoSent: this.conectedUser.nameInGame,
			userWhoReceiving: this.userInChargeOfWeaponRequest.nameInGame,
			state: StateOfWithdrawRequest.Pendiente,
			requestDate: new Date(),
			requestType: RequestType.Solicitud
		} 

		this.userInChargeOfWeaponRequest.withdrawRequest.push(withdrawRequest);
		this.conectedUser.withdrawRequest.push(withdrawRequest);


		this.dbUser.modify(this.userInChargeOfWeaponRequest)
			.then(() => {
				this.dbUser.modify(this.conectedUser)
				.then(() => {
					this.toastr.success('Ahora espera el admin a cargo de tu solicitud.', 'Perfecto!', {
						timeOut: 4000,
						positionClass: 'toast-bottom-right',
					});
				})
				.catch(() => {
					this.toastr.error('Error en la solicitud', 'Contacte con algún líder de la banda', {
						timeOut: 4000,
						positionClass: 'toast-bottom-right',
					});
				})
			})
			.catch(() => {
				this.toastr.error('Error en la solicitud', 'Contacte con algún líder de la banda', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
			.finally(() => {
				this.requestWeapon = false;
			})
	}

	public getMimsionsAccordingToLevel(min: number, max: number): IMission[] {
		let mimsionsAccordingToLevel: IMission[] = [];
		for(let mission of this.missions){
			for(let level of mission.level){
				if(level<=max || level>=min)
					mimsionsAccordingToLevel.push(mission);
			}
		}
		return mimsionsAccordingToLevel;
	}
	
	public backToTop(): void {
		this.router.navigate(['']);
	}

	// No incluye el número máximo
	private random(min: number, max: number): number {
		return Math.floor((Math.random()*(max - min))+min);
	}

}
