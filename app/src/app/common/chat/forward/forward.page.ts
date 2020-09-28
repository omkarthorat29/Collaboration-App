import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
  selector: "app-forward",
  templateUrl: "./forward.page.html",
  styleUrls: ["./forward.page.scss"],
})
export class ForwardPage implements OnInit {
  recentUsers: any;
  mainCopy: any;
  pushToSelectedArray = [];
  constructor(
    public modalController: ModalController,
    public auth: AuthService,
    public hospital: HospitalService
  ) {}
  ngOnInit() {
    this.recentMessages();
    this.auth.socket.on("newMessage", (data) => {
      if (data.idOne == this.auth.id || data.idTwo == this.auth.id) {
        this.recentMessages();
      }
    });
  }

  recentMessages() {
    this.hospital.getRecentMessages().then((data) => {
      data.forEach(async (element) => {
        if (element.idOne == this.auth.id) {
          this.auth
            .getUserProfile(element.idTwo)
            .toPromise()
            .then((userData) => {
              element.user = {
                _id: userData._id,
                fullname: userData.fullname,
                profile: userData.profile,
                isOnline: userData.isOnline,
                role: userData.role,
              };
            });
        }
        if (element.idTwo == this.auth.id) {
          this.auth
            .getUserProfile(element.idOne)
            .toPromise()
            .then((userData) => {
              element.user = {
                _id: userData._id,
                fullname: userData.fullname,
                profile: userData.profile,
                role: userData.role,
              };
            });
        }
      });

      this.recentUsers = data.filter((el) => el._id != this.auth.id);
      this.mainCopy = data.filter((el) => el._id != this.auth.id);
    });
  }

  findEL(event) {
    if (event.target.value.length === 0) {
      this.recentUsers = this.mainCopy;
    } else {
      this.recentUsers = this.mainCopy.filter(function (data) {
        return data.user.fullname
          .toLowerCase()
          .trim()
          .includes(event.target.value.toLowerCase().trim());
      });
    }
  }

  close() {
    this.modalController.dismiss({
      dismissed: true,
      data: {
        selectedIds: this.pushToSelectedArray,
      },
    });
  }

  pushToSelected(id) {
    var idIsPresent = this.pushToSelectedArray.indexOf(id);
    if (idIsPresent == -1) {
      this.pushToSelectedArray.push(id);
    } else {
      this.pushToSelectedArray.splice(idIsPresent, 1);
    }
  }

  send() {
    this.close();
  }
}
