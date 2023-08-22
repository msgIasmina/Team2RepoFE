import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent{
  constructor(private router:Router,private service:LogoutService,private notificationService:NotificationsService) { }

  logout(){
    this.service.logout().subscribe(
      response => {
        localStorage.clear();
        this.router.navigate(['/login'])
      }
    )
  }

}
