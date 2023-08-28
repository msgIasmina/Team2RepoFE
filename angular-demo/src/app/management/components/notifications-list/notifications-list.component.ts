import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { PageEvent } from '@angular/material/paginator';
import { Notif } from '../../model/notification';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css'],
})
export class NotificationsListComponent implements OnInit {
  notifList: Notif[];
  totalItems: number;

  currentPage: number = 0; // Current page index
  pageSize: number = 5; // Items per page
  pageSizeOptions: number[] = [3, 6, 12, 21, 90];

  constructor(private service: NotificationService) {}

  ngOnInit(): void {
    this.service.getSize().subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
    this.loadNotificationsAndRefresh();
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadNotificationsAndRefresh();
  }

  private loadNotificationsAndRefresh() {
    this.service
      .loadNotifications(this.currentPage, this.pageSize)
      .subscribe(() =>
        this.service.getNotifications().subscribe((notifications) => {
          console.log(notifications);
          this.notifList = notifications;
        }),
      );
  }
}
