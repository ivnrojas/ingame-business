import { Component, OnInit } from '@angular/core';
import { rouletteAnimation } from 'src/app/core/animations';
import { ICasesRegister, IItem, IUser } from 'src/app/core/entities';
import { ItemService } from 'src/app/shared/services/item.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/shared/services/log.service';

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
	public conectedUser: IUser;

	// Lista total de items
	private itemList: IItem[];

	//Cofre seleccionado
	public selectedChest: number;

	// Lista para el cofre seleccionado
	public possibleItemsList: IItem[];
	public rouletteItemsList: IItem[];

	// Cantidad de FZ segun caja
	public amountOfFZ: number;

	// Item ganador
	public winningItem: IItem;

	// Flags 
	public btnDisabled: boolean = false;
	public backToTopReady: boolean = true;

	// Loading
	public loading: boolean = true;

	constructor(private dbItem: ItemService, private session: SessionService, private dbUser: UserService, private router: Router, private toastr: ToastrService, private log: LogService) { }

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
				this.selectedChest = type;
				this.conectedUser.casesLS--;
				this.amountOfFZ = 1;
				this.generatePossibleItemsListInChestLosSantos();
				this.generateRouletteListForLS();
				break;
			case 2:
				this.selectedChest = type;
				this.conectedUser.casesSF--;
				this.amountOfFZ = 2;
				this.generatePossibleItemsListInChestSanFierro();
				this.generateRouletteListForSF();
				break;
			case 3:
				this.selectedChest = type;
				this.conectedUser.casesLV--;
				this.amountOfFZ = 5;
				this.generatePossibleItemsListInChestLasVenturas();
				this.generateRouletteListForLV();
				break;
		}
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
		this.possibleItemsList.push(this.getItemFromList('9mm silenciada'));
		this.possibleItemsList.push(this.getItemFromList('5 Medicamentos'));
		this.possibleItemsList.push(this.getItemFromList('$3000'));
		this.possibleItemsList.push(this.getItemFromList('Cofre San Fierro'));
		this.possibleItemsList.push(this.getItemFromList('Desert Eagle'));
		this.possibleItemsList.push(this.getItemFromList('Rifle'));
		this.possibleItemsList.push(this.getItemFromList('M4'));
		this.possibleItemsList.push(this.getItemFromList('FZ'));
	}

	private generatePossibleItemsListInChestLasVenturas(): void {
		this.possibleItemsList = [];
		this.possibleItemsList.push(this.getItemFromList('7 Craks'));
		this.possibleItemsList.push(this.getItemFromList('$5000'));
		this.possibleItemsList.push(this.getItemFromList('MP5'));
		this.possibleItemsList.push(this.getItemFromList('Cofre Las Venturas'));
		this.possibleItemsList.push(this.getItemFromList('$15000'));
		this.possibleItemsList.push(this.getItemFromList('AK47'));
		this.possibleItemsList.push(this.getItemFromList('Granada'));
		this.possibleItemsList.push(this.getItemFromList('FZ'));
	}
	
	private generateRouletteListForLS(): void {
		this.rouletteItemsList = [];
		for (let i=0; i<150; i++) {
			this.rouletteItemsList.push(this.getRandomProductForLS());

			if(i==140)
				this.rouletteItemsList.push(this.getWinnerProductForLS());
		}
	}

	private getWinnerProductForLS(): IItem {
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

	public getRandomProductForLS(): IItem {
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
	
	private generateRouletteListForSF(): void {
		this.rouletteItemsList = [];
		for (let i=0; i<150; i++) {
			this.rouletteItemsList.push(this.getRandomProductSF());

			if(i==140)
				this.rouletteItemsList.push(this.getWinnerProductSF());
		}
	}

	private getWinnerProductSF(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.getItemFromList('9mm silenciada');
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.getItemFromList('5 Medicamentos');
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.getItemFromList('$3000');
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.getItemFromList('Cofre San Fierro');
		if(numberRandom > 2500 && numberRandom <= 3000)			
			return this.getItemFromList('Desert Eagle');
		if(numberRandom > 3000 && numberRandom <= 3500)			
			return this.getItemFromList('Rifle');
		if(numberRandom > 3500 && numberRandom <= 4000)			
			return this.getItemFromList('M4');
		if(numberRandom > 4000)			
			return this.getItemFromList('FZ');

	}

	public getRandomProductSF(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.getItemFromList('9mm silenciada');
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.getItemFromList('5 Medicamentos');
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.getItemFromList('$3000');
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.getItemFromList('Cofre San Fierro');
		if(numberRandom > 2500 && numberRandom <= 3000)			
			return this.getItemFromList('Desert Eagle');
		if(numberRandom > 3000 && numberRandom <= 3500)			
			return this.getItemFromList('Rifle');
		if(numberRandom > 3500 && numberRandom <= 4000)			
			return this.getItemFromList('M4');
		if(numberRandom > 4000)			
			return this.getItemFromList('FZ');
	}

	private generateRouletteListForLV(): void {
		this.rouletteItemsList = [];
		for (let i=0; i<150; i++) {
			this.rouletteItemsList.push(this.getRandomProductLV());

			if(i==140)
				this.rouletteItemsList.push(this.getWinnerProductLV());
		}
	}

	private getWinnerProductLV(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.getItemFromList('7 Craks');
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.getItemFromList('$5000');
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.getItemFromList('MP5');
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.getItemFromList('Cofre Las Venturas');
		if(numberRandom > 2500 && numberRandom <= 3000)			
			return this.getItemFromList('$15000');
		if(numberRandom > 3000 && numberRandom <= 3500)			
			return this.getItemFromList('AK47');
		if(numberRandom > 3500 && numberRandom <= 4000)			
			return this.getItemFromList('Granada');
		if(numberRandom > 4000)			
			return this.getItemFromList('FZ');

	}

	public getRandomProductLV(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.getItemFromList('7 Craks');
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.getItemFromList('$5000');
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.getItemFromList('MP5');
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.getItemFromList('Cofre Las Venturas');
		if(numberRandom > 2500 && numberRandom <= 3000)			
			return this.getItemFromList('$15000');
		if(numberRandom > 3000 && numberRandom <= 3500)			
			return this.getItemFromList('AK47');
		if(numberRandom > 3500 && numberRandom <= 4000)			
			return this.getItemFromList('Granada');
		if(numberRandom > 4000)			
			return this.getItemFromList('FZ');
	}

	public getItemFromList(itemName: string): IItem {
		for(let item of this.itemList){
			if(itemName == item.name)
				return item;
		}
	}

	public buyChest(type: number): void {
		switch(type){
			case 1:
				this.buyChestLS();
				break;
			case 2:
				this.buyChestSF();
				break;
			case 3:
				this.buyChestLV();
				break;
		}
	}

	private buyChestLS(): void {
		if(this.conectedUser.money >= 2500){
			this.conectedUser.money -= 2500;
			this.conectedUser.casesLS++;
			this.authorizePurchase();
		}
		else{
			this.toastr.error('', 'No tienes dinero suficiente', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		}
	}

	private buyChestSF(): void {
		if(this.conectedUser.money >= 5000){
			this.conectedUser.money -= 5000;
			this.conectedUser.casesSF++;
			this.authorizePurchase();
		}
		else{
			this.toastr.error('', 'No tienes dinero suficiente', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		}
	}

	private buyChestLV(): void {
		if(this.conectedUser.money >= 10000){
			this.conectedUser.money -= 10000;
			this.conectedUser.casesLV++;
			this.authorizePurchase();
		}
		else{
			this.toastr.error('', 'No tienes dinero suficiente', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		}
	}

	private authorizePurchase(): void {
		this.dbUser.modify(this.conectedUser)
		.then(() => {
			this.toastr.success('Operación lograda con éxito', 'Perfecto!',  {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		})
		.catch(() => {
			this.toastr.error('Contacte con algún líder de la banda', 'Error al realizar la operación', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		})
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
				case '$5000':
				case '$15000':
					this.conectedUser.money += this.winningItem.cost; 
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
			this.registerCase();
			this.backToTopReady = false;
		}, 6500);
		
	}

	private registerCase(): void {
		let caseInitials = '';
		switch(this.selectedChest)
		{
			case 1:
				caseInitials = 'LS';
				break;
			case 2:
				caseInitials = 'SF';
				break;
			case 3:
				caseInitials = 'LV';
				break;
		}

		let caseRegister: ICasesRegister = {
			person: this.conectedUser.name,
			case: caseInitials,
			winItem: this.winningItem.img,
			firebaseTimestamp: Date.now()
		};
		this.log.addCaseRegister(caseRegister);
	}

	public backToTop(): void {
		this.router.navigate(['']);
	}

	private random(min: number, max: number): number {
		return Math.floor((Math.random()*(max - min))+min);
	}
}