import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainPage } from "./main.page";

const routes: Routes = [
  {
    path: "main",
    component: MainPage,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("../pages/dashboard/dashboard.module").then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("../pages/users/users.module").then((m) => m.UsersPageModule),
      },
      {
        path: "chat-user-list",
        loadChildren: () =>
          import("../pages/chat-user-list/chat-user-list.module").then(
            (m) => m.ChatUserListPageModule
          ),
      },
      {
        path: "recharge",
        loadChildren: () =>
          import("../pages/recharge/recharge.module").then(
            (m) => m.RechargePageModule
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
    redirectTo: "/main/main/dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
