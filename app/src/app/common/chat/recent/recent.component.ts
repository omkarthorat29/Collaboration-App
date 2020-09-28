import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-recent",
  templateUrl: "./recent.component.html",
  styleUrls: ["./recent.component.scss"],
})
export class RecentComponent implements OnInit {
  recentUsers: any;
  mainCopy: any;
  constructor(
    public auth: AuthService,
    public hospital: HospitalService,
    public rt: Router
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
      this.recentUsers = data;
      this.mainCopy = data;
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
}
