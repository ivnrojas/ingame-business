import { Component, OnInit } from '@angular/core';
import { rouletteAnimation } from 'src/app/core/animations';
import { IItem, IUser } from 'src/app/core/entities';
import { ItemService } from 'src/app/shared/services/item.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-roulette',
	templateUrl: './roulette.component.html',
	styleUrls: ['./roulette.component.scss'],
	animations: [rouletteAnimation]
})
export class RouletteComponent implements OnInit {

	// Animation
	public stateWindow: string = 'inactive'

	// Usuario Conectado
	private conectedUser: IUser;

	// Lista total de items
	private itemList: IItem[];

	//Cofre seleccionado
	public selectedChest: number;

	// Lista para el cofre seleccionado
	public possibleItemsList: IItem[];
	public rouletteItemsList: IItem[];

	// Item ganador
	public winningItem: IItem;

	// Flags 
	public btnDisabled: boolean = false;
	public backToTopReady: boolean = true;

	// Loading
	public loading: boolean = true;

	constructor(private dbItem: ItemService, private session: SessionService, private dbUser: UserService, private router: Router) { }

	ngOnInit(): void {
		this.getConectedUser();
	}

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
			this.loading = false;
		});
	}

	public async selectChest(type: number): Promise<void> {
		this.itemList = await this.dbItem.getAll_sync();
		switch(type){
			case 1: 
				if(this.conectedUser.casesLS != 0){
					this.selectedChest = type;
					this.conectedUser.casesLS--;
					this.generatePossibleItemsListInChestLosSantos();
				}
				else
					//toas infomando que no tien cajas
				break;
			case 2: 
				if(this.conectedUser.casesSF != 0){
					this.selectedChest = type;
					this.conectedUser.casesSF--;
					this.generatePossibleItemsListInChestSanFierro();
				}
				else
					//toas infomando que no tien cajas
				break;
			case 3: 
				if(this.conectedUser.casesLV != 0){
					this.selectedChest = type;
					this.conectedUser.casesLV--;
					this.generatePossibleItemsListInChestLasVenturas();
				}
				else
					//toas infomando que no tien cajas
				break;
		}
		this.generateRouletteList();
	}
	
	private generatePossibleItemsListInChestLosSantos(): void {
		this.possibleItemsList = [];
		this.possibleItemsList.push(this.getItemFromList('$1000'));
		this.possibleItemsList.push(this.getItemFromList('9mm'));
		this.possibleItemsList.push(this.getItemFromList('$2000'));
		this.possibleItemsList.push(this.getItemFromList('Cofre Los Santos'));
		this.possibleItemsList.push(this.getItemFromList('$3000'));
		this.possibleItemsList.push(this.getItemFromList('Escopeta'));
		this.possibleItemsList.push(this.getItemFromList('Escopeta de combate'));
		this.possibleItemsList.push(this.getItemFromList('FZ'));
	}

	private generatePossibleItemsListInChestSanFierro(): void {
		this.possibleItemsList = [];
		this.possibleItemsList.push(this.getItemFromList('$1000'));
		this.possibleItemsList.push(this.getItemFromList('9mm'));
		this.possibleItemsList.push(this.getItemFromList('$2000'));
		this.possibleItemsList.push(this.getItemFromList('Cofre Los Santos'));
		this.possibleItemsList.push(this.getItemFromList('$3000'));
		this.possibleItemsList.push(this.getItemFromList('Escopeta'));
		this.possibleItemsList.push(this.getItemFromList('Escopeta de combate'));
		this.possibleItemsList.push(this.getItemFromList('FZ'));
	}

	private generatePossibleItemsListInChestLasVenturas(): void {
		this.possibleItemsList = [];
		this.possibleItemsList.push(this.getItemFromList('$1000'));
		this.possibleItemsList.push(this.getItemFromList('9mm'));
		this.possibleItemsList.push(this.getItemFromList('$2000'));
		this.possibleItemsList.push(this.getItemFromList('Cofre Los Santos'));
		this.possibleItemsList.push(this.getItemFromList('$3000'));
		this.possibleItemsList.push(this.getItemFromList('Escopeta'));
		this.possibleItemsList.push(this.getItemFromList('Escopeta de combate'));
		this.possibleItemsList.push(this.getItemFromList('FZ'));
	}

	private generateRouletteList(): void {
		this.rouletteItemsList = [];
		for (let i=0; i<150; i++) {
			this.rouletteItemsList.push(this.getRandomProduct());

			if(i==140)
				this.rouletteItemsList.push(this.getWinnerProduct());
		}
	}

	private getWinnerProduct(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.getItemFromList('$1000');
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.getItemFromList('9mm');
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.getItemFromList('$3000');
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.getItemFromList('Cofre Los Santos');
		if(numberRandom > 2500 && numberRandom <= 3000)			
			return this.getItemFromList('$3000');
		if(numberRandom > 3000 && numberRandom <= 3500)			
			return this.getItemFromList('Escopeta');
		if(numberRandom > 3500 && numberRandom <= 4000)			
			return this.getItemFromList('Escopeta de combate');
		if(numberRandom > 4000)			
			return this.getItemFromList('FZ');

	}

	public getRandomProduct(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.getItemFromList('$1000');
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.getItemFromList('9mm');
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.getItemFromList('$3000');
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.getItemFromList('Cofre Los Santos');
		if(numberRandom > 2500 && numberRandom <= 3000)			
			return this.getItemFromList('$3000');
		if(numberRandom > 3000 && numberRandom <= 3500)			
			return this.getItemFromList('Escopeta');
		if(numberRandom > 3500 && numberRandom <= 4000)			
			return this.getItemFromList('Escopeta de combate');
		if(numberRandom > 4000)			
			return this.getItemFromList('FZ');
	}

	public getItemFromList(itemName: string): IItem {
		for(let item of this.itemList){
			if(itemName == item.name)
				return item;
		}
	}

	public spinRoulette(): void {
		this.btnDisabled = true;
		this.stateWindow = 'active';
		
		setTimeout(() => {
			this.winningItem = this.rouletteItemsList[141];
			switch(this.winningItem.name){
				case '$1000':
				case '$2000':
				case '$3000':
					this.conectedUser.money += this.winningItem.cost; 
					this.conectedUser.inventory.push(this.winningItem);
					break;
				case 'Cofre Los Santos':
					this.conectedUser.casesLS++; 
					break;
				case 'Cofre San Fierro':
					this.conectedUser.casesSF++; 
					break;
				case 'Cofre Las Venturas':
					this.conectedUser.casesLV++; 
					break;
				default:
					this.conectedUser.inventory.push(this.winningItem);
					break;
			}
			this.dbUser.modify(this.conectedUser);
			this.backToTopReady = false;
		}, 6500);
		
	}

	public backToTop(): void {
		this.router.navigate(['']);
	}

	private random(min: number, max: number): number {
		return Math.floor((Math.random()*(max - min))+min);
	}
}