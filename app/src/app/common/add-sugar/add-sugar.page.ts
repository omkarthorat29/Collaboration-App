import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { AuthService } from "src/app/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-add-sugar",
  templateUrl: "./add-sugar.page.html",
  styleUrls: ["./add-sugar.page.scss"],
})
export class AddSugarPage implements OnInit {
  level = "";
  on_time = "";
  constructor(
    private hospital: HospitalService,
    public auth: AuthService,
    public alertController: AlertController,
    public nav: NavController,
    public spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  addSugar() {
    if (!this.level) {
      this.presentAlert("Please enter your sugar level");
      return;
    }
    if (!this.on_time) {
      this.presentAlert("Please select time!");
      return;
    }
    if (!this.level.trim().match(/^-?\d+$/)) {
      this.presentAlert("Please enter number");
      return;
    }
    this.spinner.show();
    this.hospital
      .addPatientSugarLevel({ level: this.level.trim(), on_time: this.on_time })
      .subscribe((data) => this.auth.presentToast(this.level + " Added"))
      .add(() => {
        this.on_time = "";
        this.level = "";
        this.spinner.hide();
        this.nav.pop();
      });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",

      mode: "ios",
      message: message,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
