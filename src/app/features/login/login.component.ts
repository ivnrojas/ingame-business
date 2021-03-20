import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public loginForm: FormGroup;
	public userControl: FormControl = new FormControl('', Validators.required);
	public passwordControl: FormControl = new FormControl('', Validators.required);

	constructor(private auth: AuthService, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			'user': this.userControl,
			'pwd': this.passwordControl
		})
	}

	public login(): void {
		this.auth.loginEmail(this.userControl.value, this.passwordControl.value)
		.then(() => {
			this.toastr.success('', '¡Bienvenido!', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		})
		.catch((errorMessage) => {
			this.toastr.error(errorMessage, '', {
				timeOut: 4000,
				positionClass: 'toast-bottom-right',
			});
		})
	}

}
