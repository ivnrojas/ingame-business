import { Component, OnInit } from '@angular/core';
import { ICasesRegister, IItem, IUser } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public ELEMENT_DATA: PeriodicElement[] = [
		{ name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ name: 'Boron', weight: 10.811, symbol: 'B' },
		{ name: 'Carbon', weight: 12.0107, symbol: 'C' },
		{ name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
		{ name: 'Oxygen', weight: 15.9994, symbol: 'O' },
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

	displayedColumns: string[] = ['name', 'weight', 'symbol'];
  	dataSource = this.ELEMENT_DATA;
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
export interface PeriodicElement {
	name: string;
	weight: number;
	symbol: string;
}