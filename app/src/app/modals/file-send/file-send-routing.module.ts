import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileSendPage } from './file-send.page';

const routes: Routes = [
  {
    path: '',
    component: FileSendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileSendPageRoutingModule {}
