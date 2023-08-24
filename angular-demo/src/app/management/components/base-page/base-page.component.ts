import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout.service";
import {TranslocoService} from "@ngneat/transloco";
import {WebSocketService} from "../../services/web-socket.service";
import {Notif} from "../../model/notification";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit{

  notifoication:Notif[] = [];

  constructor(private router:Router,private service:LogoutService,private notificationService:NotificationService,private websocketService:WebSocketService,private translocoService:TranslocoService) { }

  logout(){
    this.service.logout().subscribe(
      response => {
        localStorage.clear();
        this.router.navigate(['/login'])
      }
    )
  }

  onLanguageChange(){
    const lang=this.translocoService.getActiveLang();
    this.translocoService.setActiveLang(lang==='en'?'ro':'en');
  }

  isEnglSelected(){
    return this.translocoService.getActiveLang()==='en';
  }

  ngOnInit(): void {
    this.notificationService.getUserRecentNotification().subscribe(
      notifications =>{
        this.notifoication = notifications
      }
    )
  }

  seeAllNotifications() {
    this.router.navigate(["management/notifications"])
  }
  toggleMenu() {
    const menu = document.querySelector('.menu-icon') as HTMLElement | null;
    const navbar = document.querySelector('.menu') as HTMLElement | null;

    navbar?.classList.toggle('active');
    menu?.classList.toggle('move');
  }

  goToPage(page: string) {
    this.toggleMenu();
    if(page === 'users') {
      this.router.navigate(["/management/users/0/100"]);
    }
    if(page === 'donators'){
      this.router.navigate(["/management/donators/0/100"]);
    }
    if(page === 'campaigns'){
      this.router.navigate(["/management/campaigns/listing"]);
    }
    if(page === 'home'){
      this.router.navigate(["/management/home"]);
    }
  }



}
