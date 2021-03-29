import { Component, OnInit } from '@angular/core';
import { rouletteAnimation } from 'src/app/core/animations';
import { ICasesRegister, IItem, IUser } from 'src/app/core/entities';
import { ItemService } from 'src/app/shared/services/item.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/shared/services/log.service';
import { CaseService } from 'src/app/shared/services/case.service';

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

	constructor(private caseService: CaseService, private dbItem: ItemService, private session: SessionService, private dbUser: UserService, private router: Router, private toastr: ToastrService, private log: LogService) { }

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
		switch(type){
			case 1:
				this.selectedChest = type;
				this.conectedUser.casesLS--;
				this.amountOfFZ = 1;
				this.possibleItemsList = await this.caseService.getAllLS();
				this.generateRouletteListForLS();
				break;
			case 2:
				this.selectedChest = type;
				this.conectedUser.casesSF--;
				this.amountOfFZ = 2;
				this.possibleItemsList = await this.caseService.getAllSF();
				this.generateRouletteListForSF();
				break;
			case 3:
				this.selectedChest = type;
				this.conectedUser.casesLV--;
				this.amountOfFZ = 5;
				this.possibleItemsList = await this.caseService.getAllLV();
				this.generateRouletteListForLV();
				break;
		}
	}

	private getWinnerProduct(): IItem {

		// Saldrá de 0 a 99
		let winNumber = this.random(0, 100);

		let percentageItems: IItem[] = []

		this.possibleItemsList.forEach(item => {
			for(let i=0;i<item.rate;i++)
			{
				percentageItems.push(item);
			}
		})

		return percentageItems[winNumber];
	}
	
	// ################################## LOS SANTOS ##################################

	private generateRouletteListForLS(): void {
		this.rouletteItemsList = [];
		for (let i=0; i<150; i++) {
			this.rouletteItemsList.push(this.getRandomProductForLS());

			if(i==140)
				this.rouletteItemsList.push(this.getWinnerProduct());
		}
	}

	public getRandomProductForLS(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 750)
			return this.getItemFromList('$1000');
		if(numberRandom > 750 && numberRandom <= 1500)
			return this.getItemFromList('9mm');
		if(numberRandom > 1500 && numberRandom <= 2250)
			return this.getItemFromList('$3000');
		if(numberRandom > 2250 && numberRandom <= 3000)
			return this.getItemFromList('Cofre Los Santos');
		if(numberRandom > 3000 && numberRandom <= 3750)			
			return this.getItemFromList('$3000');
		if(numberRandom > 3750 && numberRandom <= 4500)			
			return this.getItemFromList('Escopeta');
		if(numberRandom > 4500 && numberRandom <= 4900)			
			return this.getItemFromList('Escopeta de combate');
		if(numberRandom > 4900)			
			return this.getItemFromList('FZ');
	}

	

	// ##############################################################################
	
	// ################################## SAN FIERRO ##################################

	private generateRouletteListForSF(): void {
		this.rouletteItemsList = [];
		for (let i=0; i<150; i++) {
			this.rouletteItemsList.push(this.getRandomProductSF());

			if(i==140)
				this.rouletteItemsList.push(this.getWinnerProduct());
		}
	}

	public getRandomProductSF(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 750)
			return this.getItemFromList('9mm silenciada');
		if(numberRandom > 750 && numberRandom <= 1500)
			return this.getItemFromList('5 Medicamentos');
		if(numberRandom > 1500 && numberRandom <= 2250)
			return this.getItemFromList('$3000');
		if(numberRandom > 2250 && numberRandom <= 3000)
			return this.getItemFromList('Cofre San Fierro');
		if(numberRandom > 3000 && numberRandom <= 3750)			
			return this.getItemFromList('Desert Eagle');
		if(numberRandom > 3750 && numberRandom <= 4500)			
			return this.getItemFromList('Rifle');
		if(numberRandom > 4500 && numberRandom <= 4900)			
			return this.getItemFromList('M4');
		if(numberRandom > 4900)			
			return this.getItemFromList('3 FZ');
	}

	// ##############################################################################

	// ################################## LAS VENTURAS ##################################
	
	private generateRouletteListForLV(): void {
		this.rouletteItemsList = [];
		for (let i=0; i<150; i++) {
			this.rouletteItemsList.push(this.getRandomProductLV());

			if(i==140)
				this.rouletteItemsList.push(this.getWinnerProduct());
		}
	}

	public getRandomProductLV(): IItem {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 750)
			return this.getItemFromList('7 Crack');
		if(numberRandom > 750 && numberRandom <= 1500)
			return this.getItemFromList('$5000');
		if(numberRandom > 1500 && numberRandom <= 2250)
			return this.getItemFromList('MP5');
		if(numberRandom > 2250 && numberRandom <= 3000)
			return this.getItemFromList('Cofre Las Venturas');
		if(numberRandom > 3000 && numberRandom <= 3750)			
			return this.getItemFromList('$15000');
		if(numberRandom > 3750 && numberRandom <= 4500)			
			return this.getItemFromList('AK47');
		if(numberRandom > 4500 && numberRandom <= 4700)			
			return this.getItemFromList('Granada');
		if(numberRandom > 4700)			
			return this.getItemFromList('5 FZ');
	}

	// ##############################################################################

	public getItemFromList(itemName: string): IItem {
		for(let item of this.possibleItemsList){
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
					this.conectedUser.money += +this.winningItem.cost; 
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
			date: new Date(),
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

	public goToWithdrawals(): void {
		this.router.navigate(['/withdrawals']);
	}

	// No incluye el número máximo
	private random(min: number, max: number): number {
		return Math.floor((Math.random()*(max - min))+min);
	}
}