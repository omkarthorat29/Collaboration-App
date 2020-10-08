import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HospitalService } from "src/app/services/hospital.service";
import { AuthService } from "src/app/services/auth.service";
import { ModalController } from "@ionic/angular";
import { EditUserPage } from "../edit-user/edit-user.page";

@Component({
  selector: "app-user-verify",
  templateUrl: "./user-verify.page.html",
  styleUrls: ["./user-verify.page.scss"],
})
export class UserVerifyPage implements OnInit {
  role: string;
  user: any;
  verify = "no";

  copy: any;
  recentUsers: any;
  constructor(
    private route: ActivatedRoute,
    public hospital: HospitalService,
    public auth: AuthService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get("role");
    this.load();
    this.auth.socket.on("userVerified", (id) => {
      console.log(id);
      if (id == this.auth.id) this.load();
    });
  }
  load() {
    this.auth
      .getUserData()
      .toPromise()
      .then((data) => {
        this.hospital
          .allUsers(data.hospital.hospitalId, this.role)
          .subscribe(async (data) => {
            let d = await data;
            if (d) {
              this.user = d;
              this.copy = this.user.filter((el) => el.verified == this.verify);
              this.recentUsers = this.copy;
            }
          });
      });
  }

  onSelectChange(e) {
    let value = e.detail.value;
    this.copy = this.user.filter((el) => el.verified == value);
    this.recentUsers = this.copy;
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

  findEL(event) {
    if (event.target.value.length === 0) {
      this.copy = this.recentUsers;
    } else {
      this.copy = this.recentUsers.filter(function (data) {
        return data.fullname
          .toLowerCase()
          .trim()
          .includes(event.target.value.toLowerCase().trim());
      });
    }
  }
}
