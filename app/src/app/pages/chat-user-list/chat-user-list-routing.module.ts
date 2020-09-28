import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatUserListPage } from './chat-user-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChatUserListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatUserListPageRoutingModule {}
