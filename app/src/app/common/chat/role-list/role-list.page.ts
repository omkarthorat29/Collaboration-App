import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.page.html",
  styleUrls: ["./role-list.page.scss"],
})
export class RoleListPage implements OnInit {
  role: any;
  user: any;
  recentUsers: any;
  mainCopy: any;

  constructor(
    private route: ActivatedRoute,
    public hospital: HospitalService,
    public auth: AuthService,
    public rt: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    console.log(this.rt.url);
    this.role = this.route.snapshot.paramMap.get("role");

    this.load();
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
              this.recentUsers = d.filter((el) => el._id != this.auth.id);
              this.mainCopy = d.filter((el) => el._id != this.auth.id);
            }
          });
      });
  }

  back() {
    this.rt.navigateByUrl("/main/main/chat-user-list");
  }

  findEL(event) {
    if (event.target.value.length === 0) {
      this.recentUsers = this.mainCopy;
    } else {
      this.recentUsers = this.mainCopy.filter((el) => {
        return el.fullname
          .toLowerCase()
          .trim()
          .includes(event.target.value.toLowerCase().trim());
      });
    }
  }
}
