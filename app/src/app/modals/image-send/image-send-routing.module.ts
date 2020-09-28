import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageSendPage } from './image-send.page';

const routes: Routes = [
  {
    path: '',
    component: ImageSendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageSendPageRoutingModule {}
