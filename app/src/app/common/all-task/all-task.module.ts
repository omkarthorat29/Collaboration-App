import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTaskPageRoutingModule } from './all-task-routing.module';

import { AllTaskPage } from './all-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTaskPageRoutingModule
  ],
  declarations: [AllTaskPage]
})
export class AllTaskPageModule {}
