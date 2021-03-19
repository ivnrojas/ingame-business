import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouletteComponent } from './features/roulette/roulette.component'
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './features/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissionAddComponent } from './features/mission/mission-add/mission-add.component';
import { MissionListComponent } from './features/mission/mission-list/mission-list.component';
import { MissionModifyComponent } from './features/mission/mission-modify/mission-modify.component';

@NgModule({
  declarations: [
    AppComponent,
    RouletteComponent,
    LoginComponent,
    MissionAddComponent,
    MissionListComponent,
    MissionModifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
