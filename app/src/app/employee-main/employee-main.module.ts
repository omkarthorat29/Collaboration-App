import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeMainPageRoutingModule } from './employee-main-routing.module';

import { EmployeeMainPage } from './employee-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeMainPageRoutingModule
  ],
  declarations: [EmployeeMainPage]
})
export class EmployeeMainPageModule {}
