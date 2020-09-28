import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PatientMainPage } from "./patient-main.page";

const routes: Routes = [
  {
    path: "patient-main",
    component: PatientMainPage,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("../pages/dashboard/dashboard.module").then(
            (m) => m.DashboardPageModule
          ),
      },

      {
        path: "chat-user-list",
        loadChildren: () =>
          import("../pages/chat-user-list/chat-user-list.module").then(
            (m) => m.ChatUserListPageModule
          ),
      },

      {
        path: "profile",
        loadChildren: () =>
          import("../pages/profile/profile.module").then(
            (m) => m.ProfilePageModule
          ),
      },
    ],
  },
  {
    path: "",
    redirectTo: "/patient-main/patient-main/dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientMainPageRoutingModule {}
