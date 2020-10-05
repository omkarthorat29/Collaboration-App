import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.page.html",
  styleUrls: ["./employee.page.scss"],
})
export class EmployeePage implements OnInit {
  data = {
    email: "",
    password: "",
    hospitalId: "",
    role: "",
    fullname: "",
    phone: "",
  };

  roles = [
    { name: "Doctor", role: "doctor" },
    { name: "Nurse", role: "nurse" },
    { name: "Receptionist", role: "receptionist" },
    { name: "Pharmacist", role: "Pharmacist" },
  ];
  loading: any;
  hosp: any;
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

  getHospital(event) {
    if (event.target.value.length != 10 || event.target.lenght > 10) {
      this.hosp = null;

      return;
    }
    this.presentLoading();
    this.hospital
      .getHospital(event.target.value)
      .subscribe((data) => {
        if (data._id) {
          this.hosp = data;
          this.data.hospitalId = data.hospitalId;
        } else {
          this.presentAlert(data);
        }
      })
      .add(() => this.loadingController.dismiss());
  }

  register() {
    Object.keys(this.data).map((k) => (this.data[k] = this.data[k].trim()));
    let a = Object.keys(this.data).every((k) => this.data[k]);
    if (!a) {
      this.presentAlert("All Fields are mandatory");
      return;
    }
    if (!this.ValidateEmail(this.data.email)) return;
    if (this.hosp.hospitalId != this.data.hospitalId) {
      this.presentAlert("Invalid Hospital Id");
      return;
    }
    this.presentLoading();

    this.auth
      .register(this.data)
      .subscribe((data) => {
        if (data) {
          this.route.navigateByUrl("login");
          data = {
            email: "",
            password: "",
            hospitalId: "",
            role: "",
            fullname: "",
            phone: "",
          };
          this.auth.presentToast("Registered Successfully! Please Login now");
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
