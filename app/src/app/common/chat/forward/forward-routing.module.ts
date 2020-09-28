import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForwardPage } from './forward.page';

const routes: Routes = [
  {
    path: '',
    component: ForwardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForwardPageRoutingModule {}
