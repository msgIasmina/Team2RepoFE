import { EventEmitter, Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';
import { Notif } from '../model/notification';

const CHAT_URL = 'ws://localhost:8080/api/websocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  client;
  notificationEvent = new EventEmitter<Notif>();

  constructor(private toastr: ToastrService) {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/api/websocket',
      onConnect: () => {
        let permissions: string[] = JSON.parse(
          localStorage.getItem('permissions') as string,
        );
        if (permissions.includes('AUTHORITY_USER_MANAGEMENT')) {
          this.client.subscribe('/topic/userManagement', (message) => {
            const notification = JSON.parse(message.body);
            this.notificationEvent.emit(notification);
            toastr.success(notification.text, notification.date);
          });
        }
        let username: string = localStorage.getItem('username') as string;
        this.client.subscribe('/topic/' + username, (message) => {
          const notification = JSON.parse(message.body);
          this.notificationEvent.emit(notification);
          toastr.success(notification.text, notification.date);
        });
      },
    });
    this.client.activate();
  }
}
