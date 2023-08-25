import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {NotificationPagination} from "../../model/notification-pagination";
import {PageEvent} from "@angular/material/paginator";
import {Notif} from "../../model/notification";

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {

  notifList: Notif[];
  totalItems: number;

  currentPage: number = 0; // Current page index
  pageSize: number = 5; // Items per page
  pageSizeOptions: number[] = [3,6, 12, 21, 90];

  constructor(private service :NotificationService) { }

  ngOnInit(): void {
    this.service.getSize().subscribe(
      totalItems => {
        this.totalItems = totalItems;
      }
    )
    this.loadNotificationsAndRefresh();
  }

  // reloadData(pe: PageEvent) {
  //   this.service.getUsersNotification(pe.pageIndex,pe.pageSize).subscribe(
  //     notifications => this.notifications = notifications
  //   )
  //   this.size= pe.pageSize
  //   this.load = pe.pageIndex
  // }

  private loadNotificationsAndRefresh(){
    this.service.loadNotifications(this.currentPage, this.pageSize).subscribe(() =>
    this.service.getNotifications().subscribe( notifications => {
      this.notifList = notifications;
    })
  )
  }

  pageChanged(event: PageEvent): void{
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadNotificationsAndRefresh();
  }
}
