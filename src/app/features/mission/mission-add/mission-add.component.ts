import { Component, OnInit } from '@angular/core';
import { missionCategory, MissionLevel } from 'src/app/core/entities';

@Component({
    selector: 'app-mission-add',
    templateUrl: './mission-add.component.html',
    styleUrls: ['./mission-add.component.scss']
})
export class MissionAddComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
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
