import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotVerifiedPage } from './not-verified.page';

const routes: Routes = [
  {
    path: '',
    component: NotVerifiedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotVerifiedPageRoutingModule {}
