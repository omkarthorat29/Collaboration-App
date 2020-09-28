import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap, catchError } from "rxjs/operators";
import { environment } from "./../../environments/environment";
import * as io from "socket.io-client";
import { Platform, ToastController } from "@ionic/angular";

const TOKEN_KEY = "access_token";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
  socket: any;

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    public platform: Platform,
    public toastController: ToastController
  ) {
    this.socket = io.connect(environment.socketUrl);
    platform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    let token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      let decoded = this.helper.decodeToken(token);
      let isExpired = this.helper.isTokenExpired(token);

      if (!isExpired) {
        this.user = decoded;
        this.authenticationState.next(true);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  }

  adminUserUpdate(data, id) {
    return this.http.patch(`${this.url}/auth//adminUserUpdate/${id}`, data);
  }

  register(credentials) {
    return this.http.post(`${this.url}/auth/register`, credentials);
  }

  update(credentials) {
    return this.http.patch(`${this.url}/auth/userUpdate`, credentials);
  }

  login(credentials) {
    return this.http.post(`${this.url}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res["token"]);
        this.user = this.helper.decodeToken(res["token"]);
        console.log("token", localStorage.getItem(TOKEN_KEY));
        this.authenticationState.next(true);
      })
    );
  }

  getUserData() {
    return this.http.get<any>(`${this.url}/auth/special`).pipe(
      catchError((e) => {
        let status = e.status;
        if (status === 401) {
          this.logout();
          // alert('You are not authorized for this!');
        }
        throw new Error(e);
      })
    );
  }

  getUserProfile(id) {
    return this.http.get<any>(`${this.url}/auth/profile/${id}`);
  }

  logout() {
    console.log("in log");
    localStorage.removeItem(TOKEN_KEY);

    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  get id() {
    let token = localStorage.getItem(TOKEN_KEY);
    return this.helper.decodeToken(token).id;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
