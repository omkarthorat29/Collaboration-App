import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import {
  LoadingController,
  AlertController,
  NavController,
  Platform,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  data = {
    email: "",
    password: "",
  };
  loading;
  subscription: any;
  constructor(
    public auth: AuthService,
    public platform: Platform,
    public spinner: NgxSpinnerService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: NavController
  ) {
    // this.auth.authenticationState.subscribe((state) => {
    //   this.route.navigateRoot("main");
    // });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
      mode: "ios",
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alert",
      mode: "ios",
      message: message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  login() {
    this.spinner.show();
    this.auth
      .login(this.data)
      .subscribe(
        (data) => {},
        (err) => {
          this.loadingController.dismiss();
          this.presentAlert(err.error.msg);
        }
      )
      .add(() => {
        this.spinner.hide();
      });
  }

  ngOnInit() {
    console.log("entered again...........");
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
