import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { AutosizeModule } from "ngx-autosize";

import { PersonalChatPageRoutingModule } from "./personal-chat-routing.module";

import { PersonalChatPage } from "./personal-chat.page";
import { LazyLoadImageModule } from "ng-lazyload-image"; // <-- import it

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    AutosizeModule,
    PersonalChatPageRoutingModule,
  ],
  declarations: [PersonalChatPage],
})
export class PersonalChatPageModule {}
