import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(public route: Router, public nav: NavController) {}

  ngOnInit() {}

  navigate() {
    this.route.navigateByUrl("login");
  }
}
