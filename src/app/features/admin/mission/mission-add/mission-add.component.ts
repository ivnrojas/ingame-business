import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMission, IUser, MissionCategory, MissionTitle } from 'src/app/core/entities';
import { MissionsService } from 'src/app/shared/services/missions.service';

@Component({
    selector: 'app-mission-add',
    templateUrl: './mission-add.component.html',
    styleUrls: ['./mission-add.component.scss']
})
export class MissionAddComponent implements OnInit {

    public conectedUser: IUser;

    public missionForm: FormGroup;

    public titleControl = new FormControl(null, Validators.required);
    public levelMinControl = new FormControl(1, Validators.required);
    public levelMaxControl = new FormControl(3, Validators.required);
    public descriptionControl = new FormControl(null, Validators.required);
    public categoryControl = new FormControl(MissionCategory.standard, Validators.required);
    public requiredLevelControl = new FormControl(null, Validators.required);
    public companyProfitControl = new FormControl(null, Validators.required);
    public userExperienceControl = new FormControl(null, Validators.required);

    constructor(private db: MissionsService, private toastr: ToastrService) { }

    
    ngOnInit(): void {
        this.initializeTaskForm();
    }

    private initializeTaskForm(): void {
        this.missionForm = new FormGroup({
            'title': this.titleControl,
            'levelMin': this.levelMinControl,
            'levelMax': this.levelMaxControl,
            'description': this.descriptionControl,
            'category': this.categoryControl,
            'companyProfit': this.companyProfitControl,
            'userExperience': this.userExperienceControl,
            'requiredLevel': this.requiredLevelControl,
        });
    }

    public getMissionCategory(): string[] {
        return Object.values(MissionCategory);
    }

    public getMissionTitle(): string[] {
        return Object.values(MissionTitle);
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

    public generateNewMission(): void {
        let levels: number[] = [];

        for(let i=this.levelMinControl.value; i<=this.levelMaxControl.value; i++){
            levels.push(i);
        }

        let mission : IMission = {
            id: this.generateMissionId(),
            title: this.missionForm.get('title').value,
            level: levels,
            description: this.missionForm.get('description').value,
            companyProfit: +this.missionForm.get('companyProfit').value,
            userExperienceProfit: +this.missionForm.get('userExperience').value,
            startDate: null,
            category: this.missionForm.get('category').value,
            state: null,
            userInChargeOfDelivery: null,
            requiredLevel: null,
        }
        
        this.db.add(mission)
            .then(() => {
                this.toastr.success('Misión agregada con éxito', 'Perfecto!', {
                    timeOut: 4000,
                    positionClass: 'toast-bottom-right',
                });
                this.missionForm.reset();

            })
            .catch(() => {
                this.toastr.error('', 'Error en la solicitud', {
                    timeOut: 4000,
                    positionClass: 'toast-bottom-right',
                });
            })
    }
}
