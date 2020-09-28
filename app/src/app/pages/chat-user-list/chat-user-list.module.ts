import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChatUserListPageRoutingModule } from "./chat-user-list-routing.module";

import { ChatUserListPage } from "./chat-user-list.page";
import { RecentComponent } from "src/app/common/chat/recent/recent.component";
import { ListComponent } from "src/app/common/chat/list/list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatUserListPageRoutingModule,
  ],
  declarations: [ChatUserListPage, RecentComponent, ListComponent],
})
export class ChatUserListPageModule {}
