import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionStatus, ILevel, IngameRole, IUser, Levels, UserRole } from 'src/app/core/entities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

	public userForm: FormGroup;
	public ingameNameControl: FormControl = new FormControl('', Validators.required);
	public passwordControl: FormControl = new FormControl('', Validators.required);
	public nameControl: FormControl = new FormControl('', Validators.required);
	public ingameRoleControl: FormControl = new FormControl(null, Validators.required);
	public levelControl: FormControl = new FormControl(null, Validators.required);
	public respectControl: FormControl = new FormControl(null, Validators.required);

	public roleList: string[] = [];

	constructor(private auth: AuthService, private userService: UserService, private toastr: ToastrService, private router: Router, private session: SessionService) { }

	ngOnInit(): void {
		this.initLists();
		this.initForm();
	}

	private initLists(): void {
		this.roleList = Object.values(IngameRole).map(value => value);
	}

	private initForm(): void {
		this.userForm = new FormGroup({
			'ingameName': this.ingameNameControl,
			'password': this.passwordControl,
			'name': this.nameControl,
			'ingameRole': this.ingameRoleControl,
			'level': this.levelControl,
			'respect': this.respectControl
		})
	}

	public addUser(): void {

		let user: IUser = {
			nameInGame: this.ingameNameControl.value,
			name: this.nameControl.value,
			email: (this.ingameNameControl.value as string).toLowerCase()+'@gmail.com',
			password: this.passwordControl.value,
			ingameRole: this.ingameRoleControl.value as IngameRole,
			role: UserRole.User,
			level: this.getLevel(),
			experience: 0,
			currentMissions: [],
			missionHistory: [],
			money: 0,
			casesLS: 0,
			casesSF: 0,
			casesLV: 0,
			inventory: [],
			respect: this.respectControl.value,
			connectionStatus: ConnectionStatus.Desconectado,
			withdrawRequest: [],
			firebaseTimestamp: Date.now(),
			generatedProfit: 0
		};

		this.auth.registerEmail(user.email, user.password)
			.then(() => {
				this.userService.add(user)
					.then(() => {
						this.toastr.success('Registrado con éxito. Te vamos a desloguear por razones de seguridad', '', {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
						
						this.session.cleanSession();
						this.auth.logoutEmail();
						this.router.navigate(['/login']);
					})
					.catch(() => {
						this.toastr.error('Error al registrar el usuario', '', {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
					})
			})
			.catch(error => {
				this.toastr.error(error, '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
	}	

	private getLevel(): ILevel {
		let levelSelected: number = +this.levelControl.value;
		return Levels.find(x => x.level == levelSelected );
	}
}