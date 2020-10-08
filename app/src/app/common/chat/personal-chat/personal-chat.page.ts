import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  ActionSheetController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "src/app/services/message.service";
import { AuthService } from "src/app/services/auth.service";
import { HospitalService } from "src/app/services/hospital.service";
import { ImageZoomComponent } from "src/app/modals/image-zoom/image-zoom.component";
import { FileUploadService } from "src/app/services/file-upload.service";
import { ImageSendPage } from "src/app/modals/image-send/image-send.page";

import { FileSendPage } from "src/app/modals/file-send/file-send.page";
import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser/ngx";

import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";

import { File } from "@ionic-native/file/ngx";
import { NgxSpinnerService } from "ngx-spinner";
import { Storage } from "@ionic/storage";
import { ForwardPage } from "../forward/forward.page";
import { EditUserPage } from "./../../edit-user/edit-user.page";

@Component({
  selector: "app-personal-chat",
  templateUrl: "./personal-chat.page.html",
  styleUrls: ["./personal-chat.page.scss"],
})
export class PersonalChatPage implements OnInit, OnDestroy {
  @ViewChild("content") private content: any;
  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    clearcache: "yes",
    clearsessioncache: "yes",
    zoom: "yes", //Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    disallowoverscroll: "no", //iOS only
    toolbar: "yes", //iOS only
    enableViewportScale: "no", //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    presentationstyle: "pagesheet", //iOS only
    fullscreen: "yes", //Windows only
  };
  show: boolean = true;
  role: any;
  selectedId: string;
  FIRST_LIMIT = 10;
  SEND_LIMIT = 1;
  messages: any;
  selectedUser: any;
  URL = "";
  ORIGNAL_NAME: "";
  textContent = "";
  pressedId: string = "nothing";
  pressActive = false;
  pressedData: any;
  pause: boolean;
  constructor(
    private file: File,
    private transfer: FileTransfer,
    public actionSheetController: ActionSheetController,
    public active: ActivatedRoute,
    private message: MessageService,
    private platform: Platform,
    public auth: AuthService,
    private storage: Storage,
    public modalController: ModalController,
    public route: Router,
    public upload: FileUploadService,
    public spinner: NgxSpinnerService
  ) {}
  ngOnDestroy(): void {
    this.messages = null;
  }
  fileTransfer: FileTransferObject = this.transfer.create();

  ngOnInit() {
    this.platform.resume.subscribe(async () => {
      this.pause = false;
      this.getMessage(this.FIRST_LIMIT, true);
      this.scrollToBottomOnInit();
    });
    this.platform.pause.subscribe(async () => {
      this.pause = true;
      console.log("not pause...", this.pause);
    });
    this.role = this.active.snapshot.paramMap.get("role");
    this.selectedId = this.active.snapshot.paramMap.get("selectedId");
    this.getProfile();
    this.getMessage(this.FIRST_LIMIT, true);
    this.scrollToBottomOnInit();
    this.auth.socket.on("newMessage", (data) => {
      if (data.idOne == this.auth.id || data.idTwo == this.auth.id) {
        if (!this.messages) {
          this.getMessage(this.FIRST_LIMIT, true);
          this.scrollToBottomOnInit();
        } else {
          this.getMessage(this.SEND_LIMIT, false);
        }
      }
    });
    this.auth.socket.on("isSeenUpdated", (data) => {
      console.log("sock msg data", data);
      if (
        this.messages._id == data.id &&
        this.route.url == `/personal-chat/${this.selectedId}/${this.role}`
      ) {
        this.getMessage(this.FIRST_LIMIT, true);
        this.scrollToBottomOnInit();
      }
    });
  }

  async openWithInAppBrowser(url: string, name: string) {
    console.log("org name", name);
    console.log("org url", url);
    let isAvailable = await this.upload.getFilesFromFolder(name);
    if (isAvailable) {
      console.log(isAvailable);
      this.upload.previewFile(isAvailable.nativeUrl);
    } else {
      this.spinner.show();
      this.fileTransfer
        .download(url, this.file.externalRootDirectory + "/Download/" + name)
        .then(async (res) => {
          console.log("download complete: " + res.toURL());
          this.upload.previewFile(res.toURL());
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => this.spinner.hide());
    }
  }

  getMessage(limit, first?: boolean) {
    this.message
      .getMessage(this.selectedId, limit)
      .toPromise()
      .then(async (data) => {
        let m = await data;
        if (first) {
          this.messages = m;
          console.log(this.messages);
        } else {
          this.messages.messages.push(data.messages[0]);
          this.scrollToBottomOnInit();
        }
        if (
          this.messages &&
          this.route.url == `/personal-chat/${this.selectedId}/${this.role}` &&
          !this.pause
        ) {
          console.log(this.route.url);
          this.messages.messages.forEach((el) => {
            if (el.isSeen != "yes" && el.senderId != this.auth.id) {
              console.log("in loop==", el.isSeen, "====", el.senderId);
              this.message
                .updateMessage(this.messages._id, el._id)
                .toPromise()
                .then((res) => {});
            }
          });
        }
      });
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(100);
      }
    }, 200);
  }

  getProfile() {
    this.auth.getUserProfile(this.selectedId).subscribe(async (data) => {
      let user = await data;
      console.log(user);
      if (user) {
        this.selectedUser = user;
      }
    });
  }

  change(e) {
    e.target.value.length > 0 ? (this.show = false) : (this.show = true);
  }

  doRefresh(event) {
    this.FIRST_LIMIT += 5;
    this.getMessage(this.FIRST_LIMIT, true);
    console.log(this.FIRST_LIMIT);
    event.target.complete();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Choose to upload..",
      cssClass: "my-custom-class",
      mode: "md",
      buttons: [
        {
          text: "Upload Image",
          icon: "images-outline",
          handler: () => {
            this.presentModalImageSend();
          },
        },
        {
          text: "Upload File",
          icon: "document-outline",
          handler: () => {
            this.presentModalFileSend();
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

  sendMessage(type) {
    console.log("insise send", this.textContent);
    if (!this.textContent && type != "image") {
      this.scrollToBottomOnInit();
      return;
    }
    console.log("insise send");
    let send = {
      message: {
        senderId: this.auth.id,
        content: this.textContent,
        url: this.URL,
        type: type,
        originalname: this.ORIGNAL_NAME,
      },
    };

    this.message.sendMessage(send, this.selectedId, this.role).subscribe(() => {
      (this.textContent = ""), (this.ORIGNAL_NAME = ""), (this.URL = "");
      this.show = true;
      console.log("successfull");
    });
  }

  imageOpen(img, c) {
    this.presentModal(img, c);
  }

  async presentModal(img, c) {
    const modal = await this.modalController.create({
      component: ImageZoomComponent,
      cssClass: "my-custom-class",
      componentProps: {
        img: img,
        imgContent: c,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log("modal data", data);
  }

  async presentModalImageSend() {
    const modal = await this.modalController.create({
      component: ImageSendPage,
      cssClass: "my-custom-class",
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log("user chat modal data", data);
      this.URL = data.data.url;
      this.textContent = data.data.textContent;
      this.ORIGNAL_NAME = data.data.orignalName;
      this.sendMessage("image");
    }
  }

  async presentModalFileSend() {
    const modal = await this.modalController.create({
      component: FileSendPage,
      cssClass: "my-custom-class",
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log("user chat modal data", data);
      this.URL = data.data.url;
      this.ORIGNAL_NAME = data.data.orignalName;
      this.textContent = data.data.textContent;
      this.sendMessage("file");
    }
  }

  longPressActive(data) {
    this.pressedId = data._id;
    this.pressActive = true;
    this.pressedData = data;
    console.log("pressed", this.pressedData);
  }

  pressSelected(data) {
    if (!this.pressActive) return;
    console.log("unpressedd data", data);
    this.longPressRelease(data);
  }

  longPressRelease(data) {
    this.pressActive = false;
    this.pressedId = "nothing";
    console.log("unpressedd data", data);
  }

  async forward() {
    const modal = await this.modalController.create({
      component: ForwardPage,
      cssClass: "my-custom-class",
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    data.data.selectedIds.forEach((element) => {
      this.URL = this.pressedData.url;
      this.ORIGNAL_NAME = this.pressedData.originalname;
      this.textContent = this.pressedData.content;
      let send = {
        message: {
          senderId: this.auth.id,
          content: this.textContent,
          url: this.URL,
          type: this.pressedData.type,
          originalname: this.ORIGNAL_NAME,
        },
      };

      this.message.sendMessage(send, element, this.role).subscribe(() => {
        (this.textContent = ""), (this.ORIGNAL_NAME = ""), (this.URL = "");
        this.show = true;
        console.log("successfull");
      });
    });
    this.pressedData = {};
    this.longPressRelease(this.pressedData);
    setTimeout(() => {
      this.getMessage(this.FIRST_LIMIT, true);
    }, 1000);
  }

  async presentUserModal(a) {
    const modal = await this.modalController.create({
      component: EditUserPage,
      cssClass: "my-custom-class",
      componentProps: {
        data: a,
      },
    });
    return await modal.present();
  }
}
