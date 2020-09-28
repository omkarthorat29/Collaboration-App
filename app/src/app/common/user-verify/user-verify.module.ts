import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserVerifyPageRoutingModule } from './user-verify-routing.module';

import { UserVerifyPage } from './user-verify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserVerifyPageRoutingModule
  ],
  declarations: [UserVerifyPage]
})
export class UserVerifyPageModule {}
