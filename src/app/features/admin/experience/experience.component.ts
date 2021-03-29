import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser, Levels } from 'src/app/core/entities';
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

	// Porsentaje del nivel 
	public levelPercentage: number;
	
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
		this.levelPercentage = (this.userSelected.experience * 100) / this.userSelected.level.totalExperience;
	}

	public checkAddedExperience(): boolean {
		if(this.addedExperience && +this.addedExperience != 0)
			return true;
		else
			return false;
	}

	private comprobateTotalExperience(): void {
		for(let level of Levels){
			if(this.userSelected.level.level == level.level){
				this.userSelected.level.totalExperience = level.totalExperience;
				break;
			}
		}
	}

	public addExperience(): void {

		this.comprobateTotalExperience();

		if(+this.addedExperience < 0){
			
			this.userSelected.experience += +this.addedExperience;
			
			if(this.userSelected.experience < 0){

				this.userSelected.level.level--;
				let count = true;

				while(count){
					this.comprobateTotalExperience();
					this.userSelected.experience = this.userSelected.level.totalExperience + this.userSelected.experience;

					if(this.userSelected.experience >= 0)
						count = false;
					else
						this.userSelected.level.level--;
				}
			}
		}
		else if(+this.addedExperience > 0){

			this.userSelected.experience += +this.addedExperience;

			if(this.userSelected.experience >= this.userSelected.level.totalExperience){

				this.userSelected.experience -= this.userSelected.level.totalExperience;
				this.userSelected.level.level++;
				let count = true;

				while(count){
					this.comprobateTotalExperience();

					if(this.userSelected.experience >= this.userSelected.level.totalExperience){
						this.userSelected.experience -= this.userSelected.level.totalExperience;
						this.userSelected.level.level++;
					}
					else
						count = false;
				}
			}

		}
		
		this.levelPercentage = (this.userSelected.experience * 100) / this.userSelected.level.totalExperience;

		this.comprobateTotalExperience();

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
