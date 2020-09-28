import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeeMainPage } from "./employee-main.page";

const routes: Routes = [
  {
    path: "employee-main",
    component: EmployeeMainPage,
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
      {
        path: "sugar-level-for-doctor",
        loadChildren: () =>
          import(
            "../pages/sugar-level-for-doctor/sugar-level-for-doctor.module"
          ).then((m) => m.SugarLevelForDoctorPageModule),
      },
    ],
  },
  {
    path: "",
    redirectTo: "/employee-main/employee-main/dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeMainPageRoutingModule {}
