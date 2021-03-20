import { Component, OnInit } from '@angular/core';
import { MissionLevel } from 'src/app/core/entities';

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
}
