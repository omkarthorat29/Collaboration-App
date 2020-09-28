import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForwardPageRoutingModule } from './forward-routing.module';

import { ForwardPage } from './forward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForwardPageRoutingModule
  ],
  declarations: [ForwardPage]
})
export class ForwardPageModule {}
