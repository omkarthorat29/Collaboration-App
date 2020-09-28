import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
  selector: "app-recharge",
  templateUrl: "./recharge.page.html",
  styleUrls: ["./recharge.page.scss"],
})
export class RechargePage implements OnInit {
  validity: any;

  constructor(public hospital: HospitalService, public auth: AuthService) {}

  ngOnInit() {
    this.auth.getUserData().subscribe(async (data) => {
      this.hospital
        .getValidity(await data.hospital.hospitalId)
        .subscribe(async (result) => {
          this.validity = await result;
          console.log(this.validity);
          var parts = this.validity.validTill.split("/");
          var mydate = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
          this.validity.validTill = mydate;
        });
    });
  }
}
