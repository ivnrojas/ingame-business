import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConnectionStatus, IUser } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	// Usuario conectado
	private conectedUser: IUser;

	// Estado del usuario
	public connectionStatus: boolean = false;

	// Flags
	public loading: boolean = false;

	constructor(private session: SessionService, private dbUser: UserService, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.getConectedUser();
	}

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
			if(this.conectedUser.connectionStatus == ConnectionStatus.Conectado)
				this.connectionStatus = true;
			else
				this.connectionStatus = false;

			this.loading = false;
		});
	}

	public changeConnectionStatus(): void {
		this.connectionStatus = !this.connectionStatus;
		if(this.connectionStatus)
			this.conectedUser.connectionStatus = ConnectionStatus.Conectado;
		else
			this.conectedUser.connectionStatus = ConnectionStatus.Desconectado;

		this.dbUser.modify(this.conectedUser)
			.then(() => {
				switch(this.conectedUser.connectionStatus){
					case ConnectionStatus.Conectado:
						this.toastr.success('', 'Conectado',  {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
						break;
					case ConnectionStatus.Desconectado: 
						this.toastr.warning('', 'Desconectado', {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
						break;
				}
			})
			.catch(() => {
				this.toastr.error('', 'Error en el cambio de estado', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			});
	}
}
