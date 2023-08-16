import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Role} from "../../user/models/role";
import {Donator} from "../models/donator";
import {User} from "../../user/models/user";

@Injectable({
  providedIn: 'root'
})
export class DonatorService {

  constructor(private http: HttpClient) { }

  url:string = "http://localhost:8080/donators";
  //url2:string = "http://localhost:8080/donators/register";

  donatorList$: BehaviorSubject<Donator[]> = new BehaviorSubject<Donator[]>([]);

  loadDonators(page: number, size: number): Observable<Donator[]> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<Donator[]>(`${this.url}/${page}/${size}`, header).pipe(
      tap(donators => this.donatorList$.next(donators))
    );
  }

  getDonators(): Observable<Donator[]> {
    return this.donatorList$.asObservable();
  }

  saveDonator(newDonator: Donator):Observable<Donator>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')}
    return this.http.post<User>(this.url,newDonator,header)
    // return this.http.post<User>(this.url2,newDonator,header)
  }

  deleteDonator(donator: Donator){
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')}
    return this.http.delete(`${this.url}/${donator.id}`,header)
  }

}
