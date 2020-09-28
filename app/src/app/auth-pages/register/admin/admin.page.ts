import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {
  data = {
    email: "",
    password: "",
    role: "admin",
    fullname: "",
    phone: "",
  };

  loading: any;

  constructor(
    public hospital: HospitalService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AuthService,
    public route: Router
  ) {}

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

  ngOnInit() {}

  register() {
    Object.keys(this.data).map((k) => (this.data[k] = this.data[k].trim()));
    let a = Object.keys(this.data).every((k) => this.data[k]);
    if (!a) {
      this.presentAlert("All Fields are mandatory");
      return;
    }
    if (!this.ValidateEmail(this.data.email)) return;
    this.presentLoading();

    this.auth
      .register(this.data)
      .subscribe((data) => {
        if (data) {
          this.route.navigateByUrl("login");
          data = {
            email: "",
            password: "",
            role: "admin",
            fullname: "",
            phone: "",
          };
        }
      })
      .add(() => this.loadingController.dismiss());
  }

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    this.presentAlert("You have entered an invalid email address!");
    return false;
  }

  navigate() {
    this.route.navigateByUrl("login");
  }
}
