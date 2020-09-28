import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugarLevelForDoctorPage } from './sugar-level-for-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: SugarLevelForDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugarLevelForDoctorPageRoutingModule {}
