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

	public nueveMM: IProducto = {
		img:'https://www.seekpng.com/png/detail/263-2638818_c1vu3za-gta-san-andreas-pistol-icon.png',
		name: '9mm'
	}
	public nueveMMSilenciada: IProducto = {
		img:'https://vignette.wikia.nocookie.net/gtawiki/images/d/d7/Silenced9mm-GTASA-icon.png/revision/latest?cb=20150609170046',
		name: '9mm silenciada'
	}
	public escopeta: IProducto = {
		img:'https://img.superdanova.com//file/1612129635286ce03.png',
		name: 'Escopeta'
	}
	public mp5: IProducto = {
		img:'https://steamuserimages-a.akamaihd.net/ugc/795361054990162881/089D16E12BAC2C3BFCFB421DE6AEC85EEADDED3F/',
		name: 'MP5'
	}
	public escopetaCombate: IProducto = {
		img:'https://img.daylilife.com/i/EscopetaDeCombateSPAS12SanAndreasHD.png',
		name: 'Escopeta de combate'
	}

	constructor() { }

	ngOnInit(): void {
		this.generatePossibleItemsList();
		this.generateRouletteList();
	}

	private generatePossibleItemsList(): void {
		this.productList = [];
		this.productList.push(this.nueveMM);
		this.productList.push(this.nueveMMSilenciada);
		this.productList.push(this.escopeta);
		this.productList.push(this.mp5);
		this.productList.push(this.escopetaCombate);
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
		let numberRandom = this.random(1, 1765);

		if(numberRandom <= 1000)
			return this.nueveMM;
		if(numberRandom > 1000 && numberRandom <= 1500)
			return this.nueveMMSilenciada;
		if(numberRandom > 1500 && numberRandom <= 1750)
			return this.escopeta;
		if(numberRandom > 1750 && numberRandom <= 1760)
			return this.mp5;
		if(numberRandom > 1760 && numberRandom <= 1765)
			return this.escopetaCombate;	
	}

	public getRandomProduct(): IProducto {
		let numberRandom = this.random(1, 1760);

		if(numberRandom <= 500)
			return this.nueveMM;
		if(numberRandom > 500 && numberRandom <= 1000)
			return this.nueveMMSilenciada;
		if(numberRandom > 1000 && numberRandom <= 1300)
			return this.escopeta;
		if(numberRandom > 1300 && numberRandom <= 1400)
			return this.mp5;
		if(numberRandom > 1400)
			return this.escopetaCombate;	
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