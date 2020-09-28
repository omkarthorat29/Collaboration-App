import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class HospitalService {
  url = environment.url;

  constructor(private http: HttpClient, public auth: AuthService) {}

  creat(data) {
    return this.http.patch<any>(`${this.url}/hospital/create`, data);
  }

  getHospital(id) {
    return this.http.get<any>(`${this.url}/hospital/getHospital/` + id);
  }

  getAllHospitalUsers(id) {
    return this.http.get<any>(
      `${this.url}/hospital/getAllHospitalUserTypeWise/` + id
    );
  }

  allUsers(hospid, role) {
    return this.http.get<any>(
      `${this.url}/hospital/allUsers/` + hospid + "/" + role
    );
  }

  getRecentMessages() {
    return this.http
      .get<any>(`${this.url}/message/getRecentMessages`)
      .toPromise();
  }

  getValidity(hospid) {
    return this.http.get<any>(`${this.url}/hospital/getValidity/${hospid}`);
  }

  addValidity(data) {
    return this.http.patch(`${this.url}/hospital/addValidity`, data);
  }

  addPatientSugarLevel(data) {
    return this.http.patch(`${this.url}/patient/addSugarLevel`, data);
  }

  viewSuagarLevelsData() {
    return this.http.get<any>(`${this.url}/patient/viewSugarLevel`);
  }

  viewSuagarLevelsDataForDoctors(hospId) {
    return this.http.get<any>(
      `${this.url}/patient/viewForDoctorSugarLevel/${hospId}`
    );
  }
}
