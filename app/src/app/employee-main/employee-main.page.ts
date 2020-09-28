import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-employee-main",
  templateUrl: "./employee-main.page.html",
  styleUrls: ["./employee-main.page.scss"],
})
export class EmployeeMainPage implements OnInit {
  user;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.getUserData().subscribe((d) => (this.user = d));
  }
}
