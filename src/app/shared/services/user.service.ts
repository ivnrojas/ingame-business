import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IUser } from 'src/app/core/entities';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private db: AngularFirestore) { }

	public get(email: string): AngularFirestoreCollection<IUser> {
        return this.db.collection('users', ref => ref.where('email', '==', email.toLowerCase()));
    }

	public getByNickname(nickname: string): Promise<IUser> {
        return this.db.collection('users', ref => ref.where('nickname', '==', nickname)).get().toPromise()
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
