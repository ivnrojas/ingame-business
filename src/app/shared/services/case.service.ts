import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoreHelper } from 'src/app/core/core-helper';
import { IItem } from 'src/app/core/entities';

@Injectable({
	providedIn: 'root'
})
export class CaseService {

	constructor(private db: AngularFirestore) { }

    public modify(item: IItem) {
        switch(item.case)
        {
            case 'LS':
                return this.db.collection('caseLS').doc(item.firebaseId).update(CoreHelper.convertToObject(item));
            case 'SF':
                return this.db.collection('caseSF').doc(item.firebaseId).update(CoreHelper.convertToObject(item));
            case 'LV':
                return this.db.collection('caseLV').doc(item.firebaseId).update(CoreHelper.convertToObject(item));
        }
    }

	public getAllLS(): Promise<IItem[]> {
        return this.db.collection('caseLS', ref => ref.orderBy('order', 'asc')).get().toPromise().then(query => query.docs.map(x => CoreHelper.mapQueryDocumentSnapshot(x) as IItem));
    }

	public getAllSF(): Promise<IItem[]> {
        return this.db.collection('caseSF', ref => ref.orderBy('order', 'asc')).get().toPromise().then(query => query.docs.map(x => CoreHelper.mapQueryDocumentSnapshot(x) as IItem));
    }

	public getAllLV(): Promise<IItem[]> {
        return this.db.collection('caseLV', ref => ref.orderBy('order', 'asc')).get().toPromise().then(query => query.docs.map(x => CoreHelper.mapQueryDocumentSnapshot(x) as IItem));
    }
}
