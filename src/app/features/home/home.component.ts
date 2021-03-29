import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICasesRegister, IItem, IUser, IMissionRegister, MissionState } from 'src/app/core/entities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LogService } from 'src/app/shared/services/log.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


	/*

	Pendiente:
	- Conectar últimas misiones - YAMA
	- Asignar mision a una persona o sacar mision - DESPUES
	- ABM de misión - DESPUES
	- ABM de usuarios - DESPUES
	- Fake de log de caja abierta - DESPUES
	- Log de ultimas misiones cada vez que se marca una mision como completa - IVAN
	- Fake de log de ultima mision - DESPUES
	- Profit de personas, logueos y panel para visualizar - IVAN
	- Ver solicitudes ----> NOW

	*/

	public latestMissions: IMissionRegister[] = [
		{ date: new Date(), person: 'Ivana Rojas', level: 4, experience: 1000, profit: 1000 },
		{ date: new Date(), person: 'Yamil Foglia', level: 5, experience: 450, profit: 1000 },
		{ date: new Date(), person: 'Ivana Rojas', level: 4, experience: 100, profit: 1000 },
		{ date: new Date(), person: 'Nicolas Torner', level: 12, experience: 1000, profit: 1000 },
		{ date: new Date(), person: 'Felipe Melo', level: 1, experience: 350, profit: 1000 },
		{ date: new Date(), person: 'Yamil Foglia', level: 5, experience: 200, profit: 1000 },
		{ date: new Date(), person: 'Ivana Rojas', level: 4, experience: 600, profit: 1000 },
		{ date: new Date(), person: 'Nicolas Torner', level: 12, experience: 200, profit: 1000 },
	];
	
	// Usuario Conectado
	public currentUser: IUser;

	// Lista de lo ultimo del inventario (no mas de 6)
	public listOfLastInventoryItems: IItem[] = [];

	// Flags
	public loading: boolean = true;

	// Porsentaje del nivel 
	public levelPercentage: number;

	// Lista de usarios
	public userList: IUser[];

	public latestCasesColumns: string[] = ['person', 'case', 'winItem'];
	public latestMissionsColumns: string[] = ['mission'];
	
  	dataSource = this.latestMissions;
	public dataSource2;


	constructor(private session: SessionService, private auth: AuthService, private router: Router, private log: LogService, private dbUser: UserService) { }

	ngOnInit(): void {
		this.getCurrentUser();
		this.getUsers();
	}

	private async getUsers(): Promise<void> {
		let users$ = await this.dbUser.getAll().valueChanges();
		users$.subscribe(users => {
			this.userList = users;
			this.getLastestMissions();
		});
	}

	private async getCurrentUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.currentUser = user;
			this.levelPercentage = (this.currentUser.experience * 100) / this.currentUser.level.totalExperience;
			this.getListOfLastInventoryItems();
			this.loading = false;
		});

		(this.log.getAllCasesRegister().valueChanges() as Observable<ICasesRegister[]>).subscribe(data => {
			let registers = data.slice(0, 8);
			this.dataSource2 = registers;
		})
	}

	private getLastestMissions(): void{
		this.latestMissions = [];
		
	}

	private getListOfLastInventoryItems(): void {
		this.listOfLastInventoryItems = [];
		let limit: number = 0;

		if(this.currentUser.inventory.length > 6)
			limit = this.currentUser.inventory.length - 6;

		for(let i=this.currentUser.inventory.length-1; i>=limit; i--){
			this.listOfLastInventoryItems.push(this.currentUser.inventory[i]);
		}
	}

	public logout(): void {
		this.session.cleanSession();
		this.auth.logoutEmail();
		this.router.navigate(['/login']);
	}

	public goToDiscord(): void {
		window.location.href = 'https://discord.gg/dvrTkZGKAJ';
	}

}
export interface MissionRegister {
	mission: string;
}