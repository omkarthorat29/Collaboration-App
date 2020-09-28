import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";

@Component({
  selector: "app-image-zoom",
  templateUrl: "./image-zoom.component.html",
  styleUrls: ["./image-zoom.component.scss"],
})
export class ImageZoomComponent implements OnInit {
  @Input() img: string;
  @Input() imgContent: string;
  imgZoom = true;
  sliderOpts = {
    zoom: {
      maxRatio: 2,
    },
  };

  constructor(
    public modalController: ModalController,
    private platform: Platform
  ) {
    this.platform.backButton.subscribe(() => {
      if (this.imgZoom) this.close();
    });
  }

  close() {
    this.imgZoom = false;
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
      data: "omkar",
    });
  }

  ngOnInit() {}
}
