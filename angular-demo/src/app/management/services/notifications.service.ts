import {Injectable} from "@angular/core";
import { Client } from "@stomp/stompjs"
import {ToastrService} from "ngx-toastr";

const CHAT_URL = "ws://localhost:8080/api/websocket";
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  client
  constructor(private toastr:ToastrService) {
    this.client = new Client({
      brokerURL: "ws://localhost:8080/api/websocket",
      onConnect: () => {
        this.client.subscribe("/topic/userUpdated", message => {
          const notification = JSON.parse(message.body);
          toastr.success(notification.text,notification.date);
        })
      }
    });
    this.client.activate();
  }
}
