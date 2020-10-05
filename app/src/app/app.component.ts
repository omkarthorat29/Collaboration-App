import { Component } from "@angular/core";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth.service";
import { NavigationEnd, Router } from "@angular/router";
import {
  LocalNotifications,
  ELocalNotificationTriggerUnit,
} from "@ionic-native/local-notifications/ngx";
import { HospitalService } from "./services/hospital.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private backgroundMode: BackgroundMode,
    private statusBar: StatusBar,
    public auth: AuthService,
    public router: Router,
    public hospital: HospitalService,
    public localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.backgroundMode.enable();

      this.statusBar.styleDefault();

      this.statusBar.backgroundColorByHexString("#ffffff");
      this.splashScreen.hide();
      this.auth.authenticationState.subscribe((state) => {
        this.load(state);
      });
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd && this.router.url === "/login") {
          this.auth.authenticationState.subscribe((state) => {
            if (state) this.load(state);
          });
        }
      });
      this.localNotifications.on("click").subscribe((res) => {
        console.log("res........", res);
        this.router.navigate([
          `personal-chat/${res.data.selectedId}/${res.data.selectedRole}`,
        ]);
      });

      this.auth.socket.on("userUpdated", (data) => {
        if (data == this.auth.id) {
          this.auth.authenticationState.subscribe((state) => {
            this.load(state);
          });
        }
      });

      this.auth.socket.on("newMessage", (data) => {
        console.log("notification", data);
        if (
          (data.idOne == this.auth.id || data.idTwo == this.auth.id) &&
          data.message.senderId != this.auth.id
        ) {
          if (
            this.router.url !=
            `/personal-chat/${data.message.senderId}/${data.selectedRole}`
          )
            this.sendNotification(data);
        }
      });
    });
  }

  load(state) {
    if (state) {
      this.auth
        .getUserData()
        .toPromise()
        .then((data) => {
          console.log(data);
          if (data.verified == "no") {
            this.router.navigateByUrl("not-verified");
            return;
          }

          if (data.hospital) {
            this.hospital
              .getValidity(data.hospital.hospitalId)
              .toPromise()
              .then((data) => {
                if (data.verified != "yes")
                  this.router.navigateByUrl("not-verified");
                return;
              });
          }

          if (data.role == "admin") {
            if (typeof data.hospital == "undefined") {
              this.router.navigate(["create-hospital"]);
            } else {
              //if hospital plan is not expired
              this.router.navigateByUrl("main");
              //else go to not verified page
            }
          }

          if (data.role == "patient") {
            //if hospital plan is not expired
            this.router.navigateByUrl("patient-main");
            //else go to not verified page
          }

          if (data.role != "admin" && data.role != "patient") {
            //if hospital plan is not expired
            this.router.navigateByUrl("employee-main");
            //else go to not verified page
          }
        });
    } else {
      this.router.navigateByUrl("login");
    }
  }

  sendNotification(data) {
    console.log("notification", data);
    this.localNotifications.schedule({
      id: Math.floor(Math.random() * 100 + 1),
      title: data.user.fullname,
      text: data.message.content,
      attachments: [data.message.url],
      data: {
        selectedId: data.message.senderId,
        selectedRole: data.selectedRole,
      },
      trigger: { in: 1, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true,
      wakeup: true,
    });
  }
}
