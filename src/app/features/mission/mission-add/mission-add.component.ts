import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { missionCategory, MissionLevel } from 'src/app/core/entities';

@Component({
    selector: 'app-mission-add',
    templateUrl: './mission-add.component.html',
    styleUrls: ['./mission-add.component.scss']
})
export class MissionAddComponent implements OnInit {

     public missionForm: FormGroup;

     public titleControl = new FormControl(null, Validators.required);
     public levelControl = new FormControl(MissionLevel.one,Validators.required);
     public descriptionControl = new FormControl(null,Validators.required);
     public maxDayControl = new FormControl(null,Validators.required);
     public categoryControl = new FormControl(missionCategory.legal,Validators.required);
     public companyProfitControl = new FormControl(null,Validators.required);
     public userExperienceControl = new FormControl(null,Validators.required);
     
    constructor() { }

    ngOnInit(): void {
        this.initializeTaskForm();
    }

    private initializeTaskForm(): void {
        this.missionForm = new FormGroup({
            title: this.titleControl,
            level:this.levelControl,
            description: this.descriptionControl,
            maxDay: this.maxDayControl,
            category: this.categoryControl,
            companyProfit: this.companyProfitControl,
            userExperience:this.userExperienceControl
        });
    }

    public getLevelMissionKeys(): string[] {
        return Object.values(MissionLevel);
    }

    public getMissionCategory(): string[] {
        return Object.values(missionCategory);
    }

    public generateMissionId(): string {
        let result: string[] = [];
        result.push('ms');

        return result.toString();
    }
}
