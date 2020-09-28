import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSugarPageRoutingModule } from './add-sugar-routing.module';

import { AddSugarPage } from './add-sugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSugarPageRoutingModule
  ],
  declarations: [AddSugarPage]
})
export class AddSugarPageModule {}
