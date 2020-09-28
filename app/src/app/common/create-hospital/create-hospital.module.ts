import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateHospitalPageRoutingModule } from './create-hospital-routing.module';

import { CreateHospitalPage } from './create-hospital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateHospitalPageRoutingModule
  ],
  declarations: [CreateHospitalPage]
})
export class CreateHospitalPageModule {}
