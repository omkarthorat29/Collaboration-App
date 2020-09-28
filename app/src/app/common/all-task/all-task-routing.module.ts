import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTaskPage } from './all-task.page';

const routes: Routes = [
  {
    path: '',
    component: AllTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTaskPageRoutingModule {}
