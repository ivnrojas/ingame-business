import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/core/entities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public loginForm: FormGroup;
	public userControl: FormControl = new FormControl('', Validators.required);
	public passwordControl: FormControl = new FormControl('', Validators.required);
	public isLoading: boolean = false;

	constructor(private auth: AuthService, private toastr: ToastrService, private userService: UserService) { }

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			'user': this.userControl,
			'pwd': this.passwordControl
		})
	}

	/**
	 * Login main method
	 */
	public async login(): Promise<void> {
		this.isLoading = true;
		let user: IUser = await this.userService.getByNickname(this.userControl.value);

		// If we got the user from the nickname, try to login
		if(user)
		{
			this.auth.loginEmail(user.email, this.passwordControl.value)
			.then(() => {
				this.toastr.success('Ingreso exitoso', '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});

				this.loginProcess();
			})
			.catch((errorMessage) => {
				this.toastr.error(errorMessage, '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
		}
		// If we didn't get the user from the nickname, it means the user it's not registered in our app
		else
		{
			this.toastr.error(`El usuario ${this.userControl.value} no está registrado.`, '', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		}
	}

	/**
	 * Process the successfully login and builds the session for the user
	 */
	private loginProcess(): void {

	}
}
