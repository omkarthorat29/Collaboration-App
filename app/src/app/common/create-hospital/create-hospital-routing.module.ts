import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateHospitalPage } from './create-hospital.page';

const routes: Routes = [
  {
    path: '',
    component: CreateHospitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateHospitalPageRoutingModule {}
