import { Component, OnInit } from '@angular/core';
import { rouletteAnimation } from 'src/app/core/animations';
import { IItem } from 'src/app/core/entities';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
	selector: 'app-roulette',
	templateUrl: './roulette.component.html',
	styleUrls: ['./roulette.component.scss'],
	animations: [rouletteAnimation]
})
export class RouletteComponent implements OnInit {

	// Animation
	public stateWindow: string = 'inactive'

	// Lista total de items
	private itemList: IItem[];

	//Cofre seleccionado
	public selectedChest: number;

	// Lista para el cofre seleccionado
	public possibleItemsList: IItem[];
	public rouletteItemsList: IItem[];

	// Item ganador
	public winningItem: IItem;

	// Flag 
	public btnDisabled: boolean = false;


	constructor(private db: ItemService) { }

	ngOnInit(): void {
	}

	public async selectChest(type: number): Promise<void> {
		this.itemList = await this.db.getAll_sync();

		this.selectedChest = type;
		switch(type){
			case 1: 
				this.generatePossibleItemsListInChestLosSantos();
				break;
			case 2: 
				this.generatePossibleItemsListInChestSanFierro();
				break;
			case 3: 
				this.generatePossibleItemsListInChestLasVenturas();
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
		}, 6500);
		
	}

	private random(min: number, max: number): number {
		return Math.floor((Math.random()*(max - min))+min);
	}
}