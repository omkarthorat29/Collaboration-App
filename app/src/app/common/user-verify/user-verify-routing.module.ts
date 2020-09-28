import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVerifyPage } from './user-verify.page';

const routes: Routes = [
  {
    path: '',
    component: UserVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserVerifyPageRoutingModule {}
