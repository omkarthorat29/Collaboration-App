import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  url = environment.url;
  constructor(private http: HttpClient) {}

  addTask(data) {
    return this.http.post(`${this.url}/task/add`, data);
  }

  getTodaysTask() {
    return this.http.get<any>(`${this.url}/task/todaysTask`);
  }

  getAllTask() {
    return this.http.get<any>(`${this.url}/task/getAllTask`);
  }

  deleteTask(data) {
    return this.http.delete(`${this.url}/task/deleteTask/` + data._id);
  }

  updateTask(data) {
    return this.http.put(`${this.url}/task/updateTask`, data);
  }
}
