import { NgModule } from "@angular/core";
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
  HammerModule,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule, JWT_OPTIONS, JwtInterceptor } from "@auth0/angular-jwt";
import { AuthService } from "./services/auth.service";
import { FormsModule } from "@angular/forms";
import { HospitalService } from "./services/hospital.service";
import { TaskService } from "./services/task.service";
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { FileUploadService } from "./services/file-upload.service";
import { MessageService } from "./services/message.service";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { IonicStorageModule } from "@ionic/storage";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";

import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from "ng-lazyload-image"; // <-- include ScrollHooks

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HammerModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["192.168.0.2:5000"],
      },
    }),
  ],
  providers: [
    StatusBar,
    AuthService,
    BackgroundMode,
    HospitalService,
    TaskService,
    SplashScreen,
    MessageService,
    InAppBrowser,
    FileTransfer,
    DocumentViewer,
    File,
    FileUploadService,
    LocalNotifications,
    Camera,
    PreviewAnyFile,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    FileChooser,
    FilePath,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
