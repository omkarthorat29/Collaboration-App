import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-patient-main",
  templateUrl: "./patient-main.page.html",
  styleUrls: ["./patient-main.page.scss"],
})
export class PatientMainPage implements OnInit {
  user;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.getUserData().subscribe((d) => (this.user = d));
  }
}
