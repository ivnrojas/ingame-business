import { Component, OnInit } from '@angular/core';
import { CoreHelper } from 'src/app/core/core-helper';
import { IItem, IMission, IUser, RequestType } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
	selector: 'app-homeadmin',
	templateUrl: './homeadmin.component.html',
	styleUrls: ['./homeadmin.component.scss']
})
export class HomeadminComponent implements OnInit {

	public user: IUser;
	public requests: IRequest[] = [];

	constructor(private session: SessionService) { }

	async ngOnInit() {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.user = user;
			this.mapRequests();
		});
	}

	// Cambiar la forma en la que se obtiene todo tiene que ser en tiempo real, se duplican registros
	private mapRequests(): void {
		this.user.withdrawRequest.forEach(x => {
			let req: IRequest = {};

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

			this.requests.push(req);
		})
	}

}

export interface IRequest {
	title?: string,
	date?: string,
	description?: string,
	profit?: number,
	mission?: string
	money?: number,
	item?: string
}