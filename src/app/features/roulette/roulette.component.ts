import { Component, OnInit } from '@angular/core';
import { rouletteAnimation } from 'src/app/core/animations';

@Component({
	selector: 'app-roulette',
	templateUrl: './roulette.component.html',
	styleUrls: ['./roulette.component.scss'],
	animations: [rouletteAnimation]
})
export class RouletteComponent implements OnInit {

	public stateWindow: string = 'inactive'

	public productList: IProducto[];
	public productListRoulette: IProducto[];

	public winProduct: boolean = false;

	public btnDisabled: boolean = false;

	public winner: IProducto;

	public unK: IProducto = {
		img:'/assets/1k.png',
		name: '1K'
	}
	public nueveMM: IProducto = {
		img:'/assets/9mm.png',
		name: '9mm'
	}
	public dosK: IProducto = {
		img:'/assets/2k.png',
		name: '2K'
	}
	public nueveMMSilenciada: IProducto = {
		img:'/assets/9mm-silenciada.png',
		name: '9mm silenciada'
	}
	public tresK: IProducto = {
		img:'/assets/3k.png',
		name: '3K'
	}
	public escopeta: IProducto = {
		img:'/assets/escopeta.png',
		name: 'Escopeta'
	}
	public escopetaCombate: IProducto = {
		img:'/assets/EDC.png',
		name: 'Escopeta de combate'
	}

	public fz: IProducto = {
		img:'/assets/fz.png',
		name: 'FZ'
	}


	constructor() { }

	ngOnInit(): void {
		this.generatePossibleItemsList();
		this.generateRouletteList();
	}

	private generatePossibleItemsList(): void {
		this.productList = [];
		this.productList.push(this.unK);
		this.productList.push(this.nueveMM);
		this.productList.push(this.dosK);
		this.productList.push(this.tresK);
		this.productList.push(this.escopeta);
		this.productList.push(this.escopetaCombate);

		this.productList.push(this.fz);
	}

	private generateRouletteList(): void {
		this.productListRoulette = [];
		for (let i=0; i<150; i++) {
			this.productListRoulette.push(this.getRandomProduct());

			if(i==140)
				this.productListRoulette.push(this.getWinnerProduct());
		}
	}

	private getWinnerProduct(): IProducto {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.nueveMM;
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.escopetaCombate;
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.dosK;
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.tresK;
		if(numberRandom > 2500 && numberRandom <= 3000)
			return this.escopeta;
		if(numberRandom > 3000 && numberRandom <= 3500)
			return this.fz;	
		if(numberRandom > 3500)
			return this.unK;
	}

	public getRandomProduct(): IProducto {
		let numberRandom = this.random(1, 5000);

		if(numberRandom <= 500)
			return this.nueveMM;
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.escopetaCombate;
		if(numberRandom > 1000 && numberRandom <= 2000)
			return this.dosK;
		if(numberRandom > 2000 && numberRandom <= 2500)
			return this.tresK;
		if(numberRandom > 2500 && numberRandom <= 3000)
			return this.escopeta;
		if(numberRandom > 3000 && numberRandom <= 3500)
			return this.fz;	
		if(numberRandom > 3500)
			return this.unK;	
	}

	public spinRoulette(): void {
		this.btnDisabled = true;
		this.stateWindow = 'active';
		
		setTimeout(() => {
			this.winProduct = true;
			this.winner = this.productListRoulette[141];
		}, 6500);
		
	}

	private random(min: number, max: number): number {
		return Math.floor((Math.random()*(max - min))+min);
	}
}

export interface IProducto {
    img: string;
    name: string;
}