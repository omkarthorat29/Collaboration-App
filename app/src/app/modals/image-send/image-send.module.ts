import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageSendPageRoutingModule } from './image-send-routing.module';

import { ImageSendPage } from './image-send.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageSendPageRoutingModule
  ],
  declarations: [ImageSendPage]
})
export class ImageSendPageModule {}
