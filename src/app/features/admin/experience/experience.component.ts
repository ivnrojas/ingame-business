import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/core/entities';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

	// Usuarios
	public listOfUser: IUser[];

	// Usuario seleccionado para modifcar la experiencia
	public userSelected: IUser;

	// Flags
	public loading: boolean = true;

	// Ecperienca aderida 
	public addedExperience: string;
	
	constructor(private dbUser: UserService, private toastr: ToastrService) { }

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

	public selectUser(user: IUser): void {
		this.userSelected = user;
	}

	public checkAddedExperience(): boolean {
		if(this.addedExperience && +this.addedExperience != 0)
			return true;
		else
			return false;
	}

	public addExperience(): void {
		if(+this.addedExperience < 0)
			this.userSelected.experience -= +this.addedExperience;
		else if(+this.addedExperience > 0)
			this.userSelected.experience += +this.addedExperience;

		this.dbUser.modify(this.userSelected)
			.then(() => {
				this.toastr.success('', 'Experiencia modificada',  {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
				this.addedExperience = '0';
			})
			.catch(() => {
				this.toastr.info('', 'Error en la operación', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
	}

}
