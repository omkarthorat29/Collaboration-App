import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugarLevelForDoctorPageRoutingModule } from './sugar-level-for-doctor-routing.module';

import { SugarLevelForDoctorPage } from './sugar-level-for-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugarLevelForDoctorPageRoutingModule
  ],
  declarations: [SugarLevelForDoctorPage]
})
export class SugarLevelForDoctorPageModule {}
