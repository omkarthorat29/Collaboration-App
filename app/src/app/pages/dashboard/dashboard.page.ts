import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { abort } from "process";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  data: any;
  tasks;
  sugarLevel: any;
  constructor(
    public auth: AuthService,
    public route: Router,
    public hospital: HospitalService,
    public task: TaskService
  ) {}

  ngOnInit() {
    this.auth.getUserData().subscribe((data) => {
      this.data = data;
    });
    this.loadSuagrLevel();
    this.loadTodaysTask();

    this.auth.socket.on("taskAdded", (id) => {
      if (id == this.auth.id) this.loadTodaysTask();
    });
    this.auth.socket.on("sugarAdded", (id) => {
      if (id == this.auth.id) this.loadSuagrLevel();
    });
  }

  loadTodaysTask() {
    this.task.getTodaysTask().subscribe(async (data) => {
      let d = await data;
      if (d) this.tasks = d;
      this.tasks.sort(function (a, b) {
        return a.completed - b.completed;
      });
    });
  }

  loadSuagrLevel() {
    this.hospital.viewSuagarLevelsData().subscribe((data) => {
      this.sugarLevel = data;
      console.log(this.sugarLevel);
    });
  }

  allTaskNavigate() {
    this.route.navigateByUrl("all-task");
  }

  logout() {
    this.auth.logout();
  }

  delete(data) {
    this.task.deleteTask(data).subscribe(() => {
      this.loadTodaysTask();
    });
  }

  completed(data) {
    data.completed = !data.completed;
    this.task.updateTask(data).subscribe(() => {
      this.loadTodaysTask();
    });
  }

  addTask() {
    this.route.navigateByUrl("add-task");
  }

  addSugar() {
    this.route.navigateByUrl("add-sugar");
  }
}
