import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  url = environment.url;
  constructor(private http: HttpClient) {}

  sendMessage(data, selectedId, selectedRole) {
    return this.http.patch<any>(
      `${this.url}/message/addMessage/${selectedId}/${selectedRole}`,
      data
    );
  }

  getMessage(selectedId, limit) {
    return this.http.get<any>(
      `${this.url}/message/getMessage/${selectedId}/${limit}`
    );
  }

  updateMessage(id, msgId) {
    return this.http.patch<any>(
      `${this.url}/message/updateMessage/${id}/${msgId}`,
      {}
    );
  }
}
