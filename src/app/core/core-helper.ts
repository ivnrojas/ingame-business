import { QueryDocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore';
import { IFirebaseObject } from 'src/app/core/entities';

export class CoreHelper {

	public static convertToObject(obj: any): Object {
		return JSON.parse(JSON.stringify(obj));
	}

	/**
	 * Soon to be deprecated. Use mapQueryDocumentSnapshot() instead!
	 * @param doc 
	 */
	public static mapObject<T extends IFirebaseObject>(doc: QueryDocumentSnapshot<unknown>): T {
		let obj = doc.data() as T;
		obj.firebaseId = doc.id;
		return obj;
	}

	/**
	 * Maps an object of QueryDocumentSnapshot type to a JS object implementing IFirebaseObject interface.
	 * @param doc Document with QueryDocumentSnapshot type
	 */
	public static mapQueryDocumentSnapshot(doc: QueryDocumentSnapshot<unknown>): any {
		let obj: IFirebaseObject = doc.data();
		obj.firebaseId = doc.id;
		return obj;
	}

	/**
	 * Maps an object of DocumentChangeAction type to a JS object implementing IFirebaseObject interface.
	 * @param dca Document with DocumentChangeAction type
	 */
	public static mapDocumentChangeAction(dca: DocumentChangeAction<unknown>): any {
		let obj: IFirebaseObject = dca.payload.doc.data();
		obj.firebaseId = dca.payload.doc.id;
		return obj;
	}

	public static DateFormatWithoutHour(value: string): string {
		let valueDate = new Date(value);
		return  this.parseSingleNumber(valueDate.getDate()) + "/" + this.parseSingleNumber(valueDate.getMonth() + 1) + "/" + valueDate.getFullYear();
	}

	public static GetDateWithoutHourWithHyphen(): string {
		let valueDate = new Date();
		return  this.parseSingleNumber(valueDate.getDate()) + "-" + this.parseSingleNumber(valueDate.getMonth() + 1) + "-" + valueDate.getFullYear();
	}

	public static parseSingleNumber(date: number): string {
		return ((date.toString()).length == 1) ? '0' + date : date.toString();
	}

	public static getDateYYYYMMDDHHMMSS(): string {
		let date: Date = new Date()

		let day = date.getDate().toString(); //YYYY
		let year = date.getFullYear().toString(); //MM
		let hours = date.getHours().toString(); //DD
		let minutes = date.getMinutes().toString(); //HH
		let seconds = date.getSeconds().toString(); //MM
		let month = (date.getMonth()+1).toString(); //SS

		return year+month+day+hours+minutes+seconds; //YYYYMMDDHHMMSS
	}

	public static DateFormat(value: string): string {
		let valueDate = new Date(value);
		return this.parseSingleNumber(valueDate.getDate()) + "/" + this.parseSingleNumber(valueDate.getMonth() + 1) + "/" + valueDate.getFullYear() + ' ' + this.parseSingleNumber(valueDate.getHours()) + ':' + this.parseSingleNumber(valueDate.getMinutes());
	}

	public static validateSpecialCharacters(string: string): boolean {
		if(string){
			var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?"; 
			for (var i = 0; i < string.length; i++) { 
				if (iChars.indexOf(string.charAt(i)) != -1) 
					return false;
			}
			return true;	
		}
		else
			return false;
	}

	public static validateEmail(string: string): boolean {
		var patron=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
		if(string.search(patron)==0)
			return true;
		else
			return false;
	}

	public static noExtraSpaces(string: string): string {
		if(string){
			string = string.toString();
			let noEextraSpacesString = string.trim();

			let stringValid = '';
			let countSpaces = 0;
			for (var i = 0; i < noEextraSpacesString.length; i++) { 
				if (noEextraSpacesString[i] == ' ') {
					if(countSpaces == 0){
						stringValid += noEextraSpacesString[i];
						countSpaces++;	
					}
				}
				else{
					stringValid += noEextraSpacesString[i];
					countSpaces = 0;
				}
				
			}
			return stringValid;
		}
		else
			return undefined;
		
	}

	public static validateSpecialCharactersPhone(string: string): boolean {
		if(string){
			for (var i = 0; i < string.length; i++) { 
				if(!(string[i] == '0' || string[i] == '1' || string[i] == '2' || string[i] == '3' ||
				string[i] == '4' || string[i] == '5' || string[i] == '6' || string[i] == '7' ||
				string[i] == '8' || string[i] == '9' || string[i] == '+' || string[i] == '-' || string[i] == ' ')){
					return false
				}
			}
			return true;
		}
		else
			return false;
	}

	public static takeOutAllTheSpaces(string: string): string {
		if(string){
			let strignWithoutSpace = '';
			for (var i = 0; i < string.length; i++) { 
				if(string[i] != ' '){
					strignWithoutSpace += string[i];
				}
			}
			return strignWithoutSpace;
		}
		else
			return undefined;
	}

	public static generateTimebasedId(prefix: string): string {
		let date = new Date();
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1);
        let day = String(date.getDate());
        let hour = String(date.getHours());
        let minute = String(date.getMinutes());
        let seconds = String(date.getSeconds());
        month = (month.length == 1) ? "0" + month : month;
        day = (day.length == 1) ? "0" + day : day;

        return prefix + year + month + day + hour + minute + seconds;
	}
}