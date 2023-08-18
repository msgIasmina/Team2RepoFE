import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
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

  deleteDonator(donator: Donator) {
    if (!donator.id) {
      return throwError("Invalid donator ID");
    }

    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');
    return this.http.delete(`${this.url}/${donator.id}`, { headers }).pipe(
      catchError(error => {
        console.error("Error deleting donator:", error);
        return throwError("An error occurred while deleting the donator.");
      })
    );
  }

  updateDonator(donator: Donator): Observable<string> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? ''),
    }
    let id = donator.id
    donator.id = undefined
    console.log(donator)
    return this.http.put<string>(this.url + `/` + id,donator,header);
  }

  findDonatorById(id:number):Observable<Donator>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<Donator>(`${this.url}/${id}`,header);
  }

}
