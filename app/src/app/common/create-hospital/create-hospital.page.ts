import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-hospital",
  templateUrl: "./create-hospital.page.html",
  styleUrls: ["./create-hospital.page.scss"],
})
export class CreateHospitalPage implements OnInit {
  data = {
    name: "",
    phone: "",
    address: "",
    id: this.auth.id,
  };
  constructor(
    public auth: AuthService,
    public router: Router,
    private hospital: HospitalService,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  create() {
    Object.keys(this.data).map((k) => (this.data[k] = this.data[k].trim()));
    let a = Object.keys(this.data).every((k) => this.data[k]);
    if (!a) {
      this.presentAlert("All Fields are mandatory");
      return;
    }
    this.presentLoading();
    this.hospital
      .creat(this.data)
      .subscribe((data) => {
        if (data.operation) {
          this.auth.getUserData().subscribe(async (res) => {
            this.hospital
              .addValidity({
                hospitalId: await res.hospital.hospitalId,
              })
              .toPromise()
              .then((data) => {
                this.router.navigateByUrl("main");
              });
          });
        }
      })
      .add(() => {
        this.loadingController.dismiss();
      });
  }

  async presentLoading() {
    let loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
      mode: "ios",
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
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
}
