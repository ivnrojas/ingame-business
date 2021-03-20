import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-roulette',
	templateUrl: './roulette.component.html',
	styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent implements OnInit {

	public product: string;

	public roulette: boolean = false;

	constructor() { }

	ngOnInit(): void {
		this.roulette = false
	}

	public tirarRuleta(): void {

		this.roulette = true;

		this.goToDashboard();

		// for(let i=0; i<10; i++){


		// }

	}
	public goToDashboard(): void {
		let numberRandom = this.random(1, 1760);

		if(numberRandom <= 1000)
			this.product = '9mm';
		if(numberRandom > 1000 && numberRandom <= 1500)
			this.product = '9mm sileciada';
		if(numberRandom > 1500 && numberRandom <= 1750)
			this.product = 'Escopeta';
		if(numberRandom > 1750 && numberRandom <= 1760)
			this.product = 'AK47';
			
			console.log(this.product);
	}

	private random(min: number, max: number): number {
		return Math.floor((Math.random()*(max - min))+min);
	}
}
