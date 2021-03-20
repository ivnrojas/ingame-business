import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/entities';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	private currentUser: IUser;
	private currentUser$: Observable<IUser>;

	constructor(private auth: AuthService, private userService: UserService) { }

	private async initializeUser(): Promise<IUser> {
		this.currentUser = await this.auth.getCurrentUser();
		this.currentUser$ = await this.auth.getCurrentUserObservable();
		return this.currentUser;
	}

	public async getUser(): Promise<IUser> {
		if (this.currentUser)
			return this.currentUser;
		else 
		{
			return this.initializeUser();
		}
	}

	public async getUserObservable(): Promise<Observable<IUser>> {
		if (this.currentUser && this.currentUser$)
			return this.currentUser$;
		else 
		{
			await this.initializeUser();
			return this.currentUser$;
		}
	}
}