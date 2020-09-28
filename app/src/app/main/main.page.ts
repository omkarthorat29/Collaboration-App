import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"],
})
export class MainPage implements OnInit {
  user;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.getUserData().subscribe((d) => (this.user = d));
  }
}
