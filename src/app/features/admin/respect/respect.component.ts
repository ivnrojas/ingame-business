import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/entities';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-respect',
	templateUrl: './respect.component.html',
	styleUrls: ['./respect.component.scss']
})
export class RespectComponent implements OnInit {

	// Usuarios
	public listOfUser: IUser[];

	// Usuario seleccionado para modifcar el respeto
	public userSelected: IUser;

	// Flags
	public loading: boolean = true;
	
	constructor(private dbUser: UserService) { }

	ngOnInit(): void {
		this.getUsers();
	}

	private async getUsers(): Promise<void> {
		let users$ = await this.dbUser.getAll()
		.valueChanges().subscribe(users => {
			this.listOfUser = users;
			this.loading = false;
		});
	}

	public selectUser(user: IUser): void{
		this.userSelected = user;
	}

	public modifyRespect(quantity: number): void {
		switch(quantity){
			case 1:
				this.userSelected.respect+=1;
				this.dbUser.modify(this.userSelected);
				break;
			case 2:
				this.userSelected.respect+=2;
				this.dbUser.modify(this.userSelected);
				break;
			case 3:
				this.userSelected.respect+=3;
				this.dbUser.modify(this.userSelected);
				break;
			case -1:
				this.userSelected.respect-=1;
				this.dbUser.modify(this.userSelected);
				break;
			case -2:
				this.userSelected.respect-=2;
				this.dbUser.modify(this.userSelected);
				break;
			case -3:
				this.userSelected.respect-=3;
				this.dbUser.modify(this.userSelected);
				break;
		}
	}

}
