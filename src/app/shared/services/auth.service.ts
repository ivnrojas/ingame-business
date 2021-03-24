import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { LoginErrorCodes } from 'src/app/core/data';
import { IFirebaseError, IUser } from '../../core/entities';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { CoreHelper } from 'src/app/core/core-helper';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private afa: AngularFireAuth, private user: UserService) { }

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

	public registerEmail(email: string, pwd: string): Promise<unknown> {
		return new Promise((resolve, reject) => {
			this.afa.createUserWithEmailAndPassword(email, pwd)
				.then(userData => {
					resolve(userData);
				})
				.catch(error => {
					let description = (error as IFirebaseError).message
					reject(description);
				});
		});
	}

	
	public getCurrentUser(): Promise<IUser> {
		return this.getCurrentEmailLogged().then(email => {
			return this.user.getByEmail(email);
		})
	}

	public async getCurrentUserObservable(): Promise<Observable<IUser>> {
		let email = await this.getCurrentEmailLogged();
		return this.user.get(email).snapshotChanges().pipe(map(query => CoreHelper.mapDocumentChangeAction(query[0])));
	}

	public getCurrentEmailLogged(): Promise<string> {
		return this.afa.user.pipe(
			take(1),
			map(user => user.email)
		)
		.toPromise();
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
