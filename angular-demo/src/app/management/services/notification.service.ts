import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Notif} from "../model/notification";
import {NotificationPagination} from "../model/notification-pagination";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url:string = "http://localhost:8080/notifications/";

  notificationsList$: BehaviorSubject<Notif[]> = new BehaviorSubject<Notif[]>([]);
  totalItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http:HttpClient) { }
  getUserRecentNotification(){
    let userId :number =   JSON.parse(localStorage.getItem("userId") as string);
    return this.http.get<Notif[]>(this.url+userId);
  }

  getUsersNotification(load:number,size:number){
    let userId :number =   JSON.parse(localStorage.getItem("userId") as string);
    return this.http.get<NotificationPagination>(this.url+load+`/${size}/${userId}`);
  }

  loadNotifications(page: number, size: number): Observable<Notif[]>{
    const params: any = {};
    params['offset'] = page;
    params['pageSize'] = size;

    let userId :number =   JSON.parse(localStorage.getItem("userId") as string);

    return this.http.get<Notif[]>(this.url + `${userId}`, {params}).pipe(
      tap(notifications => {
        this.notificationsList$.next(notifications)
      })
    );
  }

  getSize(): Observable<number> {
    const headers = new HttpHeaders()
      .set("Authorization", localStorage.getItem("token") ?? '');

    let userId :number = JSON.parse(localStorage.getItem("userId") as string);

    return this.http.get<number>(this.url + `size/${userId}`, { headers }).pipe(
      tap(size => this.totalItems$.next(size))
    );
  }

  getNotifications(): Observable<Notif[]>{
    return this.notificationsList$.asObservable();
  }
}
