import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissionAddComponent } from './mission/mission-add/mission-add.component';
import { MissionListComponent } from './mission/mission-list/mission-list.component';
import { MissionModifyComponent } from './mission/mission-modify/mission-modify.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    AdminComponent,
    MissionAddComponent,
    MissionListComponent,
    MissionModifyComponent,
    UserAddComponent,
    UserListComponent,
    HomeadminComponent,
    ItemListComponent,
    ItemAddComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    TextFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule { }
