import { Component, OnInit } from "@angular/core";
import { ModalController, ActionSheetController } from "@ionic/angular";
import { FileUploadService } from "src/app/services/file-upload.service";
import { NgxSpinnerService } from "ngx-spinner";

import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
@Component({
  selector: "app-file-send",
  templateUrl: "./file-send.page.html",
  styleUrls: ["./file-send.page.scss"],
})
export class FileSendPage implements OnInit {
  imageUrl = "";
  textContent = "";
  orignalName = "";

  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public upload: FileUploadService,
    private spinner: NgxSpinnerService,
    public FilePath: FilePath,
    private fileChooser: FileChooser
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

  uploadFile(blob) {
    this.spinner.show();
    this.upload
      .uploadFile(blob)
      .subscribe((data) => {
        this.imageUrl = data.location;
        this.orignalName = data.originalname;
      })
      .add(() => {
        this.spinner.hide();
      });
  }

  selectFile() {
    let file;
    this.fileChooser.open().then((uri) => {
      console.log(uri);
      this.FilePath.resolveNativePath(uri).then((fileentry) => {
        let filename = this.upload.getfilename(fileentry);
        let fileext = this.upload.getfileext(fileentry);

        if (fileext == "pdf") {
          this.upload
            .makeDocFileIntoBlob(fileentry, fileext, "application/pdf")
            .then((fileblob) => {
              file = {
                blob: fileblob,
                type: "application/pdf",
                fileext: fileext,
                filename: filename,
              };
              this.uploadFile(fileblob);
            });
        }
        if (fileext == "docx") {
          this.upload
            .makeDocFileIntoBlob(
              fileentry,
              fileext,
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
            .then((fileblob) => {
              file = {
                blob: fileblob,
                type:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                fileext: fileext,
                filename: filename,
              };
              this.uploadFile(fileblob);
            });
        }
        if (fileext == "doc") {
          this.upload
            .makeDocFileIntoBlob(fileentry, fileext, "application/msword")
            .then((fileblob) => {
              file = {
                blob: fileblob,
                type: "application/msword",
                fileext: fileext,
                filename: filename,
              };
              this.uploadFile(fileblob);
            });
        }
        if (fileext == "epub") {
          this.upload
            .makeDocFileIntoBlob(fileentry, fileext, "application/octet-stream")
            .then((fileblob) => {
              file = {
                blob: fileblob,
                type: "application/octet-stream",
                fileext: fileext,
                filename: filename,
              };
              this.uploadFile(fileblob);
            });
        }

        if (fileext == "xlsx") {
          this.upload
            .makeDocFileIntoBlob(
              fileentry,
              filename,
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
            .then((fileblob) => {
              file = {
                blob: fileblob,
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileext: fileext,
                filename: filename,
              };
              this.uploadFile(fileblob);
            });
        }

        //      else if (fileext!="doc"||"epub"||"xlsx"||"pdf"||"accdb"||"docx" ){

        //alert("Can't add "+  filename)

        //      }
      });
    });
  }
}
