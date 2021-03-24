import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IItem } from 'src/app/core/entities';


@Injectable({
	providedIn: 'root'
})
export class ItemService {

	constructor(private db: AngularFirestore) { }

	public getAll_sync(): Promise<IItem[]> {
		return this.db.collection('items').get().toPromise()
			.then(query => {
				let items: IItem[] = [];
				query.docs.forEach(doc => {
					let item = doc.data() as IItem;
					item.firebaseId = doc.id;
					items.push(item);
				});
				return items;
			});
	}
}
