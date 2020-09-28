import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSugarPage } from './add-sugar.page';

const routes: Routes = [
  {
    path: '',
    component: AddSugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSugarPageRoutingModule {}
