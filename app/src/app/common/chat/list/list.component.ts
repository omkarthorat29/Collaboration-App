import { Component, OnInit } from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { findIndex } from "rxjs/operators";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  count: any;
  user: any;

  constructor(
    public hospital: HospitalService,
    public auth: AuthService,
    public route: Router
  ) {}

  ngOnInit() {
    this.getAllHospitalUserTypeWise();
  }

  getAllHospitalUserTypeWise() {
    this.auth
      .getUserData()
      .toPromise()
      .then((data) => {
        this.user = data;
        this.hospital
          .getAllHospitalUsers(data.hospital.hospitalId)
          .subscribe((res) => {
            if (data.role == "patient") {
              let index = res.findIndex((el) => el._id == "patient");
              res.splice(index, 1);
              this.count = res;
            } else {
              this.count = res;
            }
          });
      });
  }
}
