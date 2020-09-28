import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import {
  AlertController,
  ToastController,
  ActionSheetController,
} from "@ionic/angular";
import { FileUploadService } from "src/app/services/file-upload.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  data;
  spin: boolean = false;
  private win: any = window;
  roles = [
    { name: "Doctor", role: "doctor" },
    { name: "Nurse", role: "nurse" },
    { name: "Receptionist", role: "receptionist" },
    { name: "Pharmacist", role: "Pharmacist" },
  ];
  profile: any;

  constructor(
    public auth: AuthService,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,

    public upload: FileUploadService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.auth.socket.on("userUpdated", (id) => {
      if (id == this.auth.id) this.load();
    });
    this.load();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top",
    });
    toast.present();
  }

  load() {
    this.auth.getUserData().subscribe(async (data) => {
      this.data = await data;

      if (!("profile" in this.data))
        this.data.profile = "../../../assets/avatar.png";
    });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",

      header: "Alert",
      mode: "ios",
      message: message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  update(message) {
    console.log(this.data);
    let a = Object.keys(this.data).every((k) => this.data[k]);
    if (!a) {
      this.presentAlert("All Fields are mandatory");
      return;
    }
    if (!this.ValidateEmail(this.data.email)) return;

    this.auth.update(this.data).subscribe(() => {
      this.presentToast(message);
    });

    //console.log(this.data);
  }

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    this.presentAlert("You have entered an invalid email address!");
    return false;
  }

  getCamera() {
    this.upload.getCamera().then((data: Blob) => {
      if (!data) return;
      this.spin = true;

      this.upload
        .uploadImage(data)
        .subscribe(
          (d) => {
            this.data.profile = d.location;
            this.profile = this.data.profile;
            this.update("Profile Updated");

            console.log(this.profile);
          },
          (err) => console.log(err)
        )
        .add(() => {
          this.spin = false;
        });
    });
  }

  getGallary() {
    this.upload
      .getGallary()
      .then((data: Blob) => {
        if (!data) return;
        this.spin = true;

        this.upload
          .uploadImage(data)
          .subscribe(
            (d) => {
              console.log(d);
              this.data.profile = d.location;
              this.profile = this.data.profile;
              this.update("Profile Updated");

              console.log(this.profile);
            },
            (err) => console.log(err)
          )
          .add(() => {
            this.spin = false;
          });
      })
      .catch((err) => console.log(err));
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Capture From Camera",
          icon: "camera-sharp",
          handler: () => {
            this.getCamera();
          },
        },
        {
          text: "Open Gallary",
          icon: "image-sharp",
          handler: () => {
            this.getGallary();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
