import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoreHelper } from 'src/app/core/core-helper';
import { IItem, IMission, IUser, IWithdrawRequest, RequestType } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-homeadmin',
	templateUrl: './homeadmin.component.html',
	styleUrls: ['./homeadmin.component.scss']
})
export class HomeadminComponent implements OnInit {

	public user: IUser;
	public requests: IRequest[] = [];

	constructor(private session: SessionService, private userService: UserService, private toastr: ToastrService) { }

	async ngOnInit() {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.user = user;
			this.mapRequests();
		});
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
			}

			return req;
		})
	}

	public async closeRequest(reqId: string) {
		let withdrawRequest:IWithdrawRequest = this.user.withdrawRequest.find(x => x.requestDate.toString() == reqId);
		this.userService.markRequestAsComplete(this.user.firebaseId, withdrawRequest)
			.then(async () => {
				let userId = (await this.userService.getByNameInGame(withdrawRequest.userWhoSent)).firebaseId;

				if(withdrawRequest.requestType == RequestType.Item)	
					this.userService.removeItemFromInventory(userId, withdrawRequest.itemRequest as IItem);
					
				this.toastr.success('Solicitud completada!', '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
			.catch(() => {
				this.toastr.error('No se pudo completar la solicitud', '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
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