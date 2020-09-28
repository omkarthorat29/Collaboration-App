import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { AuthService } from "src/app/services/auth.service";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-chat-user-list",
  templateUrl: "./chat-user-list.page.html",
  styleUrls: ["./chat-user-list.page.scss"],
})
export class ChatUserListPage implements OnInit, AfterViewInit {
  @ViewChild(IonSlides) slides: IonSlides;
  count: any;
  value = "recent";
  public options: any = {
    onInit: (slides: any) => {
      this.swiper = slides;
    },
  };
  swiper: any;
  constructor(public hospital: HospitalService, public auth: AuthService) {}
  ngAfterViewInit(): void {
    //   this.goToSlide(1);
  }

  ngOnInit() {
    this.getAllHospitalUserTypeWise();
  }

  getAllHospitalUserTypeWise() {
    this.auth
      .getUserData()
      .toPromise()
      .then((data) => {
        console.log(data);
        this.count = this.hospital.getAllHospitalUsers(
          data.hospital.hospitalId
        );
      });
  }

  segmentChanged(ev: any) {
    this.value = ev.detail.value;
    ev.detail.value == "recent" ? this.goToSlide(1) : this.goToSlide(2);
  }

  goToSlide(index) {
    index == 1 ? this.slides.slidePrev(500) : this.slides.slideNext(500);
    this.scrollToTop();
    // this.slides.slideTo(index, 500);
  }

  slideChanged(ev) {
    this.slides.getActiveIndex().then((index) => {
      index == 0 ? (this.value = "recent") : (this.value = "list");
    });
  }

  scrollToTop() {
    let top = document.getElementById("top");
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
}
