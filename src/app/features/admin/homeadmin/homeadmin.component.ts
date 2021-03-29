import { Component, OnInit } from '@angular/core';
import { Session } from 'node:inspector';
import { IUser, IWithdrawRequest } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
	selector: 'app-homeadmin',
	templateUrl: './homeadmin.component.html',
	styleUrls: ['./homeadmin.component.scss']
})
export class HomeadminComponent implements OnInit {

	public user: IUser;

	constructor(private session: SessionService) { }

	async ngOnInit() {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.user = user;
			
		});
	}

}