import { Component, Input, OnInit } from '@angular/core';
import { Notif } from '../../model/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notif;

  constructor() {}

  ngOnInit(): void {}
}
