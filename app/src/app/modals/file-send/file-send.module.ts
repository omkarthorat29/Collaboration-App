import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileSendPageRoutingModule } from './file-send-routing.module';

import { FileSendPage } from './file-send.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileSendPageRoutingModule
  ],
  declarations: [FileSendPage]
})
export class FileSendPageModule {}
