import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoreHelper } from 'src/app/core/core-helper';
import { IMission } from 'src/app/core/entities';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  constructor(private db: AngularFirestore) { }
  
	public add(mission: IMission): Promise<unknown> {
    return this.db.collection('missions').add(CoreHelper.convertToObject(mission));
}
}
