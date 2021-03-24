import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CoreHelper } from 'src/app/core/core-helper';
import { IUser } from 'src/app/core/entities';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private db: AngularFirestore) { }

	public get(email: string): AngularFirestoreCollection<IUser> {
        return this.db.collection('users', ref => ref.where('email', '==', email.toLowerCase()));
    }

	public getByNameInGame(nameInGame: string): Promise<IUser> {
        return this.db.collection('users', ref => ref.where('nameInGame', '==', nameInGame)).get().toPromise()
			.then(query => {
				if(query.docs && query.docs[0])
				{
					let user: IUser = query.docs[0].data() as IUser;
					user.firebaseId = query.docs[0].id;
					return user;
				}
				else
					return null;
			})
			.catch(() => {
				return null;
			});
    }

	public add(user: IUser): Promise<unknown> {
        return this.db.collection('users').add(CoreHelper.convertToObject(user));
    }

	public getByEmail(email: string): Promise<IUser> {
        return this.db.collection('users', ref => ref.where('email', '==', email.toLowerCase())).get().toPromise()
            .then(query => {
                if(query.docs && query.docs[0])
				{
					let user: IUser = query.docs[0].data() as IUser;
					user.firebaseId = query.docs[0].id;
					return user;
				}
				else
					return null;
            })
            .catch(() => {
				return null;
			});
    }
}
