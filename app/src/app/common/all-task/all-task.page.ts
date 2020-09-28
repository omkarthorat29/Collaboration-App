import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-all-task",
  templateUrl: "./all-task.page.html",
  styleUrls: ["./all-task.page.scss"],
})
export class AllTaskPage implements OnInit {
  tasks: any;

  constructor(private task: TaskService) {}

  ngOnInit() {
    this.tasks = this.task.getAllTask();
  }
}
