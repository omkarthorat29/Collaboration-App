import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditUserPageRoutingModule } from "./edit-user-routing.module";

import { EditUserPage } from "./edit-user.page";
import { LazyLoadImageModule } from "ng-lazyload-image"; // <-- import it

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    IonicModule,
    EditUserPageRoutingModule,
  ],
  declarations: [EditUserPage],
})
export class EditUserPageModule {}
