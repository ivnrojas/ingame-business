import { Component, OnInit } from '@angular/core';
import { ICasesRegister, IItem, IUser, IMissionRegister } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	// { mission: 'Ivana Rojas (Nivel 4) cumplió una misión y ganó 1000 de experiencia.' },

	public latestMissions: IMissionRegister[] = [
		{ person: 'Ivana Rojas', level: 4, experience: 1000 },
		{ person: 'Yamil Foglia', level: 5, experience: 450 },
		{ person: 'Ivana Rojas', level: 4, experience: 100 },
		{ person: 'Nicolas Torner', level: 12, experience: 1000 },
		{ person: 'Felipe Melo', level: 1, experience: 350 },
		{ person: 'Yamil Foglia', level: 5, experience: 200 },
		{ person: 'Ivana Rojas', level: 4, experience: 600 },
		{ person: 'Nicolas Torner', level: 12, experience: 200 },
	];

	public latestCases: ICasesRegister[] = [
		{ person: 'Ivana Rojas', case: 'LS', winItem: '9mm.png' },
		{ person: 'Emaa Garcia', case: 'SF', winItem: '1k.png' },
		{ person: 'Ivana Rojas', case: 'LS', winItem: '3k.png' },
		{ person: 'Ivana Rojas', case: 'LV', winItem: 'escopeta.png' },
		{ person: 'Yamil Foglia', case: 'LV', winItem: '9mm.png' },
		{ person: 'Facu Vadell', case: 'LS', winItem: 'fz.png' },
		{ person: 'Yamil Foglia', case: 'LS', winItem: 'EDC.png' },
		{ person: 'Facu Vadell', case: 'SF', winItem: '9mm-silenciada.png' },
	];

	private conectedUser: IUser;
	public listOfLastInventoryItems: IItem[] = [];

	public latestCasesColumns: string[] = ['person', 'case', 'winItem'];
	public latestMissionsColumns: string[] = ['mission'];
	
  	dataSource = this.latestMissions;
  	dataSource2 = this.latestCases;

	public loading: boolean = true;

	constructor(private session: SessionService) { }

	ngOnInit(): void {
		this.getConectedUser();
	}

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
			this.getListOfLastInventoryItems();
			this.loading = false;
		});
	}

	private getListOfLastInventoryItems(): void {
		this.listOfLastInventoryItems = [];
		let limit: number = 0;

		if(this.conectedUser.inventory.length > 6)
			limit = this.conectedUser.inventory.length - 7;

		for(let i=this.conectedUser.inventory.length-1; i>limit; i--){
			this.listOfLastInventoryItems.push(this.conectedUser.inventory[i]);
		}
	}

}
export interface MissionRegister {
	mission: string;
}