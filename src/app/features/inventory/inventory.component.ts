import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConnectionStatus, IItem, IUser, IWithdrawRequest, StateOfWithdrawRequest } from 'src/app/core/entities';
import { ItemService } from 'src/app/shared/services/item.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

	// Usuario conectado
	private conectedUser: IUser;

	// Admins conectados
	public adminUsersConected: IUser[];

	// Flags
	public loading: boolean = true;

	// Listas de items dentro del inventario
	public listOfItemsInInventory: IItem[];
	public listOfItemsInInventoryPending : IItem[];


	// Item por retirar
	public withdrawItem: IItem;

	// Admin encargado del retiro
	public userInChargeOfWithdrawal: IUser;
	

	constructor(private session: SessionService, private dbUser: UserService, private toastr: ToastrService, private router: Router) { }

	ngOnInit(): void {
		this.getConectedUser();
		this.getAdminUser();
	}

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
			this.getInventoryItems();
			this.loading = false;
		});
	}

	private getInventoryItems(): void {
		this.listOfItemsInInventory = [];
		this.listOfItemsInInventoryPending = [];

		for(let item of this.conectedUser.inventory){
			if(item.pendingWithdrawal)
				this.listOfItemsInInventoryPending.push(item);
			else
				this.listOfItemsInInventory.push(item)
		}
	}

	private async getAdminUser(): Promise<void> {
		let adminUser$ = await this.dbUser.getAdminUser();
		adminUser$.valueChanges().subscribe(users => {
			this.adminUsersConected = [];
			for(let user of users){
				if((user as IUser).connectionStatus == ConnectionStatus.Conectado)
					this.adminUsersConected.push(user as IUser);
			}
		})
	}

	public withdraw(item: IItem): void {
		this.withdrawItem = item;
	}

	public withdrawItemOfUser(): void {
		let withdrawRequest: IWithdrawRequest = {
			itemRequest: this.withdrawItem,
			userWhoSent: this.userInChargeOfWithdrawal.nameInGame,
			userWhoReceiving: this.conectedUser.nameInGame,
			state: StateOfWithdrawRequest.Pendiente,
			requestDate: new Date()
		} 
		
		this.userInChargeOfWithdrawal.withdrawRequest.push(withdrawRequest);

		for(let i=0; i< this.conectedUser.inventory.length; i++){
			if(this.conectedUser.inventory[i] == this.withdrawItem){
				this.conectedUser.inventory[i].pendingWithdrawal = true;
				this.conectedUser.inventory[i].userInChargeOfWithdrawal = this.userInChargeOfWithdrawal.nameInGame;
			}
		}
		
		this.loading = true;
		this.dbUser.modify(this.userInChargeOfWithdrawal)
			.then(() => {
				this.dbUser.modify(this.conectedUser)
					.then(() => {
						this.toastr.success('ahora espera el admin a cargo de tu retiro.', 'Perfecto!',  {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
					})
					.catch(() => {
						this.toastr.error('Contacte con algún líder de la banda', 'Error en el retiro', {
							timeOut: 4000,
							positionClass: 'toast-bottom-right',
						});
					})
			})
			.catch(() => {
				this.toastr.error('Error en el retiro', 'Contacte con algún líder de la banda', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
			})
			.finally(() => {
				this.withdrawItem = undefined; // para volver al inventario
				this.loading = false;
			})


	}

}
