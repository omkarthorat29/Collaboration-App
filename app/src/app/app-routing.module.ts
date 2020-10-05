import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth-pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "main",
    loadChildren: () =>
      import("./main/main.module").then((m) => m.MainPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "create-hospital",
    loadChildren: () =>
      import("./common/create-hospital/create-hospital.module").then(
        (m) => m.CreateHospitalPageModule
      ),
  },
  {
    path: "add-task",
    loadChildren: () =>
      import("./common/add-task/add-task.module").then(
        (m) => m.AddTaskPageModule
      ),
  },
  {
    path: "all-task",
    loadChildren: () =>
      import("./common/all-task/all-task.module").then(
        (m) => m.AllTaskPageModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./auth-pages/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "user-verify/:role",
    loadChildren: () =>
      import("./common/user-verify/user-verify.module").then(
        (m) => m.UserVerifyPageModule
      ),
  },
  {
    path: "edit-user",
    loadChildren: () =>
      import("./common/edit-user/edit-user.module").then(
        (m) => m.EditUserPageModule
      ),
  },
  {
    path: "role-list/:role",
    loadChildren: () =>
      import("./common/chat/role-list/role-list.module").then(
        (m) => m.RoleListPageModule
      ),
  },
  {
    path: "personal-chat/:selectedId/:role",
    loadChildren: () =>
      import("./common/chat/personal-chat/personal-chat.module").then(
        (m) => m.PersonalChatPageModule
      ),
  },
  {
    path: "image-send",
    loadChildren: () =>
      import("./modals/image-send/image-send.module").then(
        (m) => m.ImageSendPageModule
      ),
  },
  {
    path: "file-send",
    loadChildren: () =>
      import("./modals/file-send/file-send.module").then(
        (m) => m.FileSendPageModule
      ),
  },
  {
    path: "employee-main",
    loadChildren: () =>
      import("./employee-main/employee-main.module").then(
        (m) => m.EmployeeMainPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "patient-main",
    loadChildren: () =>
      import("./patient-main/patient-main.module").then(
        (m) => m.PatientMainPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "not-verified",
    loadChildren: () =>
      import("./common/not-verified/not-verified.module").then(
        (m) => m.NotVerifiedPageModule
      ),
  },
  {
    path: "add-sugar",
    loadChildren: () =>
      import("./common/add-sugar/add-sugar.module").then(
        (m) => m.AddSugarPageModule
      ),
  },
  {
    path: "forward",
    loadChildren: () =>
      import("./common/chat/forward/forward.module").then(
        (m) => m.ForwardPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
