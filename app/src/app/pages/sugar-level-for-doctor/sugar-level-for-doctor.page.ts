import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";
import { EditUserPage } from "./../../common/edit-user/edit-user.page";

@Component({
  selector: "app-sugar-level-for-doctor",
  templateUrl: "./sugar-level-for-doctor.page.html",
  styleUrls: ["./sugar-level-for-doctor.page.scss"],
})
export class SugarLevelForDoctorPage implements OnInit {
  sugarLevels: any;
  constructor(
    private hospital: HospitalService,
    public auth: AuthService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.auth
      .getUserData()
      .toPromise()
      .then((data) => {
        console.log("data -------------", data);
        this.auth.socket.on("patientSugarAdded", (hospid) => {
          if (data.hospital.hospitalId == hospid) {
            console.log("hosp id ", hospid);
            this.loadSugarLevelForDoctor();
          }
        });
      });
    this.loadSugarLevelForDoctor();
  }

  loadSugarLevelForDoctor() {
    this.auth
      .getUserData()
      .toPromise()
      .then((data) => {
        this.hospital
          .viewSuagarLevelsDataForDoctors(data.hospital.hospitalId)
          .subscribe(async (res) => {
            this.sugarLevels = await res;
          });
      });
  }

  async presentModal(a) {
    const modal = await this.modalController.create({
      component: EditUserPage,
      cssClass: "my-custom-class",
      componentProps: {
        data: a,
      },
    });
    return await modal.present();
  }
}
