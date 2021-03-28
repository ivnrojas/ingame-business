import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

    constructor(private caseService: CaseService, private toastr: ToastrService) { }

    async ngOnInit() {
        this.casesLS = await this.caseService.getAllLS();
        this.casesSF = await this.caseService.getAllSF();
        this.casesLV = await this.caseService.getAllLV();
    }

    public saveChanges(item: IItem): void {
        this.caseService.modify(item)
            .then(() => {
                this.toastr.success('Datos actualizados correctamente', '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
            })
            .catch(() => {
                this.toastr.error('No se pudo actualizar el dato', '', {
					timeOut: 4000,
					positionClass: 'toast-bottom-right',
				});
            })
    }

}
