import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
import { TranslocoService } from '@ngneat/transloco';
import { WebSocketService } from '../../services/web-socket.service';
import { Notif } from '../../model/notification';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css'],
})
export class BasePageComponent implements OnInit {
  notifoication: Notif[] = [];
  length = 0;

  constructor(
    private router: Router,
    private service: LogoutService,
    private notificationService: NotificationService,
    private websocketService: WebSocketService,
    private translocoService: TranslocoService,
  ) {}

  logout() {
    this.service.logout().subscribe((response) => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  onLanguageChange() {
    const lang = this.translocoService.getActiveLang();
    this.translocoService.setActiveLang(lang === 'en' ? 'ro' : 'en');
  }

  isEnglSelected() {
    return this.translocoService.getActiveLang() === 'en';
  }

  ngOnInit(): void {
    this.notificationService.getUserRecentNotification().subscribe(
      notifications =>{
        this.notifoication = notifications
        this.length = notifications.length;
      }
    )
    // this.websocketService.notificationEvent.subscribe(
    //   (notification) => {
    //     this.length++;
    //     if (this.notifoication.length == 3){
    //       this.notifoication.splice(0,1 )
    //     }
    //     this.notifoication.push(notification)
    //   }
    // )
  }

  seeAllNotifications() {
    this.length = 0;
    this.router.navigate(['management/notifications']);
  }

  toggleMenu() {
    const menu = document.querySelector('.menu-icon') as HTMLElement | null;
    const navbar = document.querySelector('.menu') as HTMLElement | null;

    navbar?.classList.toggle('active');
    menu?.classList.toggle('move');
  }

  goToPage(page: string) {
    this.toggleMenu();
    if (page === 'users') {
      this.router.navigate(['/management/users/list']);
    }
    if (page === 'donators') {
      this.router.navigate(['/management/donators/list']);
    }
    if (page === 'campaigns') {
      this.router.navigate(['/management/campaigns/list']);
    }
    if (page === 'home') {
      this.router.navigate(['/management/home']);
    }
    if (page === 'donations') {
      this.router.navigate(['/management/donations/list']);
    }
  }
}
