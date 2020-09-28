import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.page.html",
  styleUrls: ["./edit-user.page.scss"],
})
export class EditUserPage implements OnInit {
  @Input() data;
  userData: any;
  constructor(
    public modalController: ModalController,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.getUserData().subscribe((data) => {
      this.userData = data;
    });
    console.log(this.data);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  verify(verify, id) {
    this.auth
      .adminUserUpdate({ verified: verify }, id)
      .toPromise()
      .then(() => {
        this.dismiss();
        this.auth.presentToast("User Updated Successfully");
      });
  }
}
