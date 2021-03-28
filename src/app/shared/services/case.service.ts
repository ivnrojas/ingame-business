import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class CaseService {

	constructor(private db: AngularFirestore) { }

	// public getAllLS(register: ICasesRegister): Promise<unknown> {
    //     return this.db.collection('casesRegister').add(CoreHelper.convertToObject(register));
    // }

}
