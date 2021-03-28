import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/core/entities';
import { CaseService } from 'src/app/shared/services/case.service';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

    public casesLS: IItem[] = [];
    public casesSF: IItem[] = [];
    public casesLV: IItem[] = [];

    constructor(private caseService: CaseService) { }

    async ngOnInit() {
        this.casesLS = await this.caseService.getAllLS();
        this.casesSF = await this.caseService.getAllSF();
        this.casesLV = await this.caseService.getAllLV();
    }

}
