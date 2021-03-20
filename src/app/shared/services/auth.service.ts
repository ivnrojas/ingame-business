import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { LoginErrorCodes } from 'src/app/core/data';
import { IFirebaseError } from '../../core/entities';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private afa: AngularFireAuth) { }

	public loginEmail(email: string, pwd: string): Promise<unknown> {
		return new Promise((resolve, reject) => {
				this.afa.signInWithEmailAndPassword(email, pwd)
				.then(data => {
					data.user.getIdTokenResult().then(userdata => resolve(userdata));
				})
				.catch(error => {
					const description = this.handleLoginErrors(error as IFirebaseError);
					reject(description);
				})
		})
	}

	private handleLoginErrors(error: IFirebaseError): string {
		switch (error.code) {
			case LoginErrorCodes.EmailBadlyFormatted:
				return 'El formato del email no es correcto.';
			case LoginErrorCodes.EmailNotFound:
				return 'Tu email no está registrado.';
			case LoginErrorCodes.WrongPassword:
				return 'La contraseña es incorrecta.';
			case LoginErrorCodes.TooManyRequests:
				return 'Se ha deshabilitado la cuenta debido a la cantidad de intentos fallidos para ingresar. Inténtelo más tarde o contacte al soporte técnico.';
			default:
				return 'Error desconocido. Contacte al soporte técnico.';
		}
	}
}
