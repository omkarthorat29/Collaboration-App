import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientMainPageRoutingModule } from './patient-main-routing.module';

import { PatientMainPage } from './patient-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientMainPageRoutingModule
  ],
  declarations: [PatientMainPage]
})
export class PatientMainPageModule {}
