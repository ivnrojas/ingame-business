import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMission, IUser, missionCategory, MissionLevel, missionState } from 'src/app/core/entities';
import { SessionService } from 'src/app/shared/services/session.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-mission-add',
    templateUrl: './mission-add.component.html',
    styleUrls: ['./mission-add.component.scss']
})
export class MissionAddComponent implements OnInit {

    public conectedUser: IUser;

    public missionForm: FormGroup;

    public titleControl = new FormControl(null, Validators.required);
    public levelControl = new FormControl(MissionLevel.one, Validators.required);
    public descriptionControl = new FormControl(null, Validators.required);
    public maxDayControl = new FormControl(null, Validators.required);
    public categoryControl = new FormControl(missionCategory.legal, Validators.required);
    public companyProfitControl = new FormControl(null, Validators.required);
    public userExperienceControl = new FormControl(null, Validators.required);
    public deliverToControl = new FormControl('Ivana', Validators.required);
    public notifyTocontrol = new FormControl('Ivana', Validators.required);

    constructor(private db: UserService, private session: SessionService) { }

    
    ngOnInit(): void {
        this.getConectedUser();
        this.initializeTaskForm();
    }

	private async getConectedUser(): Promise<void> {
		let user$ = await this.session.getUserObservable();
		user$.subscribe(user => {
			this.conectedUser = user;
		});
	}
    private initializeTaskForm(): void {
        this.missionForm = new FormGroup({
            title: this.titleControl,
            level: this.levelControl,
            description: this.descriptionControl,
            maxDay: this.maxDayControl,
            category: this.categoryControl,
            companyProfit: this.companyProfitControl,
            userExperience: this.userExperienceControl,
            deliverTo: this.deliverToControl,
            notifyTo: this.notifyTocontrol
        });
    }

    public getLevelMissionKeys(): string[] {
        return Object.values(MissionLevel);
    }

    public getMissionCategory(): string[] {
        return Object.values(missionCategory);
    }

    public generateMissionId(): string {
        let date = new Date();
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1);
        let day = String(date.getDate());
        let hour = String(date.getHours());
        let minute = String(date.getMinutes());
        let seconds = String(date.getSeconds());
        month = (month.length == 1) ? "0" + month : month;
        day = (day.length == 1) ? "0" + day : day;

        return 'MS' + year + month + day + hour + minute + seconds;
    }

    public generateMission(): IMission {
        return {
            id: this.generateMissionId(),
            title: this.missionForm.get('title').value,
            level: this.missionForm.get('level').value,
            description: this.missionForm.get('description').value,
            companyProfit: this.missionForm.get('companyProfit').value,
            userExperienceProfit: this.missionForm.get('userExperience').value,
            deliverTo: this.missionForm.get('deliverTo').value,
            startDate: new Date(),
            maxDate: this.missionForm.get('maxDay').value,
            closeDate: null,
            category: this.missionForm.get('category').value,
            state: null,
            group: null,
            userInChargeOfDelivery: null,
            requiredLevel: null,
        }
    }

    public generateNewMission(): void {
        let newMission = this.generateMission();
        console.log(newMission);
        this.conectedUser.currentMissions.push(newMission);
        this.db.modify(this.conectedUser);
    }
}
