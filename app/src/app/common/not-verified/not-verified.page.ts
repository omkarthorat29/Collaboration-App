import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-not-verified",
  templateUrl: "./not-verified.page.html",
  styleUrls: ["./not-verified.page.scss"],
})
export class NotVerifiedPage implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
