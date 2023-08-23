import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {NotificationPagination} from "../../model/notification-pagination";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {

  notifications :NotificationPagination
  load:number=0;
  size:number=6;

  constructor(private service :NotificationService) { }

  ngOnInit(): void {
    this.service.getUsersNotification(this.load,this.size).subscribe(
      notifications => this.notifications = notifications
    )
  }

  reloadData(pe: PageEvent) {
    this.service.getUsersNotification(pe.pageIndex,pe.pageSize).subscribe(
      notifications => this.notifications = notifications
    )
    this.size= pe.pageSize
    this.load = pe.pageIndex
  }
}
