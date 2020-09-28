import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.page.html",
  styleUrls: ["./add-task.page.scss"],
})
export class AddTaskPage implements OnInit {
  data = {
    name: "",
  };
  loading: HTMLIonLoadingElement;
  constructor(
    private task: TaskService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  addTask() {
    if (!this.data.name || this.data.name.length > 30) {
      this.presentAlert(
        "You need to give task name or it should be less than 30"
      );
      return;
    }
    this.task.addTask(this.data).subscribe((data) => {
      if (data) {
        this.presentToast(this.data.name + " Added");
        this.data.name = "";
      }
    });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",

      mode: "ios",
      message: message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async presentToast(messsage) {
    const toast = await this.toastController.create({
      message: messsage,
      position: "middle",
      duration: 2000,
      mode: "md",
    });
    await toast.present();
  }
}
