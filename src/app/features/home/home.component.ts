import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICasesRegister, IItem, IUser, IMissionRegister } from 'src/app/core/entities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


	/*

	Pendiente:
	- Diseño de cajas por abrir en el home NOW
	- Noticias
	- Conectar últimas misiones
	- Conectar cajas abiertas
	- Discord link
	- Solicitar mision y ver misiones en el home
	- Sistema de misiones
	- Dentro de /cases poder comprar mas cajas o pedir extraccion de dinero
	- Dentro de /inventory poder extraer los items o pedir extraccion de dinero
	- Boton para entrar a admin en home
	- ABM de misión
	- ABM de cajas
	- ABM de usuarios
	- Dar o sacar experiencia
	- Dar o sacar respeto
	- Algoritmo de rates para cajas
	- Asignar mision a una persona o sacar mision
	- Logs de ultimas cajas abiertas cada vez que se abre una caja
	- Fake de log de caja abierta
	- Log de ultimas misiones cada vez que se marca una mision como completa
	- Fake de log de ultima mision


	*/

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

	
	// Usuario Conectado
	public currentUser: IUser;

	// Lista de lo ultimo del inventario (no mas de 6)
	public listOfLastInventoryItems: IItem[] = [];

	// Flags
	public loading: boolean = true;

	public latestCasesColumns: string[] = ['person', 'case', 'winItem'];
	public latestMissionsColumns: string[] = ['mission'];
	
  	dataSource = this.latestMissions;
  	dataSource2 = this.latestCases;


	constructor(private session: SessionService, private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.getCurrentUser();
	}

	private async getCurrentUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.currentUser = user;
			this.getListOfLastInventoryItems();
			this.loading = false;
		});
	}

	private getListOfLastInventoryItems(): void {
		this.listOfLastInventoryItems = [];
		let limit: number = 0;

		if(this.currentUser.inventory.length > 6)
			limit = this.currentUser.inventory.length - 7;

		for(let i=this.currentUser.inventory.length-1; i>limit; i--){
			this.listOfLastInventoryItems.push(this.currentUser.inventory[i]);
		}
	}

	public logout(): void {
		this.session.cleanSession();
		this.auth.logoutEmail();
		this.router.navigate(['/login']);
	}

}
export interface MissionRegister {
	mission: string;
}