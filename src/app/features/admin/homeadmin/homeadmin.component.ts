import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoreHelper } from 'src/app/core/core-helper';
import { IItem, IMission, IMissionRegister, IUser, IWithdrawRequest, Levels, RequestType } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LogService } from 'src/app/shared/services/log.service';

@Component({
	selector: 'app-homeadmin',
	templateUrl: './homeadmin.component.html',
	styleUrls: ['./homeadmin.component.scss']
})
export class HomeadminComponent implements OnInit {

	public user: IUser;
	public allUsers: IUser[] = [];
	public requests: IRequest[] = [];

	constructor(private session: SessionService, private userService: UserService, private toastr: ToastrService, private log: LogService) { }

	async ngOnInit() {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.user = user;
			this.mapRequests();
		});
		this.userService.getAll().valueChanges().subscribe(users => {
			this.allUsers = users;
		})
	}

	// The ID will be the exact date
	private mapRequests(): void {
		this.requests = this.user.withdrawRequest.map(x => {
			let req: IRequest = { id : x.requestDate.toString() };

			switch(x.requestType)
			{
				case RequestType.Item:
					req.date = CoreHelper.DateFormat(x.requestDate.toString());
					req.item = (x.itemRequest as IItem).name;
					req.title =  `Retiro de ${req.item} - ${x.userWhoSent}`;
					req.description = `${x.userWhoSent} quiere retirar un/una ${req.item} de su inventario.`;
					req.profit = (x.itemRequest as IItem).profit * -1;
					break;
				case RequestType.Mission:
					req.date = CoreHelper.DateFormat(x.requestDate.toString());
					req.title = `Completar misión - ${x.userWhoSent}`;
					req.description = `${x.userWhoSent} quiere completar una misión: `;
					req.mission = (x.itemRequest as IMission).description; 
					req.profit = (x.itemRequest as IMission).companyProfit;
					break;
				case RequestType.Money:
					req.date = CoreHelper.DateFormat(x.requestDate.toString());
					req.title = `Retiro de $${+x.itemRequest} - ${x.userWhoSent}`;
					req.description = `${x.userWhoSent} quiere retirar $${+x.itemRequest} de su dinero.`;
					req.profit = +x.itemRequest * -1;
					break;
				case RequestType.Solicitud:
					req.date = CoreHelper.DateFormat(x.requestDate.toString());
					req.title = `Solicitud de dinero/item - ${x.userWhoSent}`;
					req.description = `${x.userWhoSent} necesita un item o dinero para comenzar la siguiente misión: `;
					req.mission = (x.itemRequest as IMission).description; 
					req.profit = (x.itemRequest as IMission).companyProfit;
					break;
			}

			return req;
		})
	}

	public async closeRequest(reqId: string) {
		let withdrawRequest:IWithdrawRequest = this.user.withdrawRequest.find(x => x.requestDate.toString() == reqId);
		this.userService.markRequestAsComplete(this.user.firebaseId, withdrawRequest)
			.then(async () => {
				let otherUser = await this.userService.getByNameInGame(withdrawRequest.userWhoSent);
				let userId = otherUser.firebaseId;

				switch(withdrawRequest.requestType)
				{
					case RequestType.Item:
						this.userService.removeItemFromInventory(userId, withdrawRequest.itemRequest as IItem)
							.then(() => {
								let cost = otherUser.generatedProfit + ((withdrawRequest.itemRequest as IItem).profit * -1)
								this.userService.changeProfit(userId, cost);
								this.handleSuccess();
							})
							.catch(() => this.handleError())
						break;
					case RequestType.Money:
						this.userService.markRequestAsComplete(userId, withdrawRequest)
							.then(() => {
								let cost = otherUser.generatedProfit + (+withdrawRequest.itemRequest * -1)
								this.userService.changeProfit(userId, cost);
								this.handleSuccess();
							})
							.catch(() => this.handleError())
						break;
					case RequestType.Mission:
						this.userService.removeMissionFromList(userId, withdrawRequest.itemRequest as IMission)
							.then(() => {

								let experienceToAdd: number = (withdrawRequest.itemRequest as IMission).userExperienceProfit;
								this.comprobateTotalExperience(otherUser);

								otherUser.experience += experienceToAdd;
						
								if(otherUser.experience >= otherUser.level.totalExperience){
					
									otherUser.experience -= otherUser.level.totalExperience;
									otherUser.level.level++;
									let count = true;
					
									while(count){
										this.comprobateTotalExperience(otherUser);
					
										if(otherUser.experience >= otherUser.level.totalExperience){
											otherUser.experience -= otherUser.level.totalExperience;
											otherUser.level.level++;
										}
										else
											count = false;
									}
								}
								this.comprobateTotalExperience(otherUser);
						
								this.userService.modify(otherUser)
									.then(() => {
										let profit = otherUser.generatedProfit + (withdrawRequest.itemRequest as IMission).companyProfit;
										this.userService.changeProfit(userId, profit);
										let register: IMissionRegister = {
											date: new Date(),
											person: otherUser.nameInGame,
											level: otherUser.level.level,
											experience: (withdrawRequest.itemRequest as IMission).userExperienceProfit,
											profit: (withdrawRequest.itemRequest as IMission).companyProfit,
											firebaseTimestamp: Date.now()
										}
										this.log.addMissionRegister(register);
										this.handleSuccess();
									})
									.catch(() => this.handleError());
							})
							.catch(() => this.handleError())
						break;
					case RequestType.Solicitud:
						this.userService.markRequestAsComplete(userId, withdrawRequest)
							.then(() => this.handleSuccess())
							.catch(() => this.handleError())
						break;
				}	

			})
			.catch(() => {
				this.toastr.error('No se pudo completar la solicitud', '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
	}

	private handleSuccess(): void {
		this.toastr.success('Solicitud completada!', '', {
			timeOut: 4000,
			positionClass: 'toast-bottom-right',
		});
	}

	private handleError(): void {
		this.toastr.error('No se ha podido completar la transacción.', '', {
			timeOut: 10000,
			positionClass: 'toast-bottom-right',
		});
	}
	
	private comprobateTotalExperience(user: IUser): void {
		for(let level of Levels){
			if(this.user.level.level == level.level){
				this.user.level.totalExperience = level.totalExperience;
				break;
			}
		}
	}

}

export interface IRequest {
	id: string;
	title?: string,
	date?: string,
	description?: string,
	profit?: number,
	mission?: string
	money?: number,
	item?: string
}