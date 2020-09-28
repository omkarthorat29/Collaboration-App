import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PateintPageRoutingModule } from './pateint-routing.module';

import { PateintPage } from './pateint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PateintPageRoutingModule
  ],
  declarations: [PateintPage]
})
export class PateintPageModule {}
