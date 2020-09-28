import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PateintPage } from './pateint.page';

const routes: Routes = [
  {
    path: '',
    component: PateintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PateintPageRoutingModule {}
