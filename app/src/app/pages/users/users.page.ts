import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"],
})
export class UsersPage implements OnInit {
  count: any;
  constructor(
    public hospital: HospitalService,
    public auth: AuthService,
    public route: Router
  ) {}

  ngOnInit() {
    this.getAllHospitalUserTypeWise();
  }

  getAllHospitalUserTypeWise() {
    console.log("in hospital");
    this.auth
      .getUserData()
      .toPromise()
      .then((data) => {
        console.log(data);
        this.count = this.hospital.getAllHospitalUsers(
          data.hospital.hospitalId
        );
      });
  }

  navigate(role) {
    this.route.navigateByUrl("user-verify/" + role);
  }
}
