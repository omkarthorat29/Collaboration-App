import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotVerifiedPageRoutingModule } from './not-verified-routing.module';

import { NotVerifiedPage } from './not-verified.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotVerifiedPageRoutingModule
  ],
  declarations: [NotVerifiedPage]
})
export class NotVerifiedPageModule {}
