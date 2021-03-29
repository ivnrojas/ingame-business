import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoreHelper } from 'src/app/core/core-helper';
import { ICasesRegister, IMissionRegister } from 'src/app/core/entities';

@Injectable({
	providedIn: 'root'
})
export class LogService {

	constructor(private db: AngularFirestore) { }

	public addCaseRegister(register: ICasesRegister): Promise<unknown> {
        return this.db.collection('casesRegister').add(CoreHelper.convertToObject(register));
    }

	public addMissionRegister(register: IMissionRegister): Promise<unknown> {
        return this.db.collection('missionsRegister').add(CoreHelper.convertToObject(register));
    }

    public getAllCasesRegister() {
        return this.db.collection('casesRegister', ref => ref.orderBy('firebaseTimestamp', 'desc'));
    }

    public getAllMissionRegister() {
        return this.db.collection('missionsRegister', ref => ref.orderBy('firebaseTimestamp', 'desc'));
    }

}
