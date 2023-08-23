import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notif} from "../model/notification";
import {NotificationPagination} from "../model/notification-pagination";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url:string = "http://localhost:8080/notifications/";
  constructor(private http:HttpClient) { }
  getUserRecentNotification(){
    let userId :number =   JSON.parse(localStorage.getItem("userId") as string);
    return this.http.get<Notif[]>(this.url+userId);
  }

  getUsersNotification(load:number,size:number){
    let userId :number =   JSON.parse(localStorage.getItem("userId") as string);
    return this.http.get<NotificationPagination>(this.url+load+`/${size}/${userId}`);
  }
}
