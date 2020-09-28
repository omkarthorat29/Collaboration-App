import { Component, OnInit } from "@angular/core";
import { ModalController, ActionSheetController } from "@ionic/angular";
import { FileUploadService } from "src/app/services/file-upload.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-image-send",
  templateUrl: "./image-send.page.html",
  styleUrls: ["./image-send.page.scss"],
})
export class ImageSendPage implements OnInit {
  imageUrl = "";
  textContent = "";
  sliderOpts = {
    zoom: {
      maxRatio: 2,
    },
  };
  orignalName: any;
  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public upload: FileUploadService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss({
      dismissed: true,
      data: {
        url: this.imageUrl,
        textContent: this.textContent,
        orignalName: this.orignalName,
      },
    });
  }

  send() {
    this.close();
  }

  async chooseImageOption() {
    const actionSheet = await this.actionSheetController.create({
      header: "Choose to upload..",
      cssClass: "my-custom-class",
      mode: "md",
      buttons: [
        {
          text: "Capture From Camera",
          icon: "camera",
          handler: () => {
            this.getCamera();
          },
        },
        {
          text: "Upload From Gallary",
          icon: "images-outline",
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

  getGallary() {
    this.upload.getGallary().then((data: Blob) => {
      if (!data) return;
      this.spinner.show();
      console.log("blob", data);
      this.upload
        .uploadImage(data)
        .subscribe(
          (d) => {
            console.log("iamge upload data", d);
            this.imageUrl = d.location;
            this.orignalName = d.originalname;
          },
          (err) => console.log(err)
        )
        .add(() => {
          this.spinner.hide();
        });
    });
  }

  getCamera() {
    this.upload.getCamera().then((data: Blob) => {
      if (!data) return;
      this.spinner.show();
      console.log("blob", data);
      this.upload
        .uploadImage(data)
        .subscribe(
          (d) => {
            console.log("iamge upload data", d);
            this.imageUrl = d.location;
            this.orignalName = d.originalname;
          },
          (err) => console.log(err)
        )
        .add(() => {
          this.spinner.hide();
        });
    });
  }
}
