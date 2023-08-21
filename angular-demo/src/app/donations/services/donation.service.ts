import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Donation} from "../models/donation";
import {Donator} from "../../donator/models/donator";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(
    private http: HttpClient
  ){}

  url: string = "http://localhost:8080/donations";

  donationList$: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);

  loadDonations(page: number, size: number): Observable<Donation[]> {
    const headers = new HttpHeaders()
      .set("Authorization", localStorage.getItem("token") ?? ''); // empty string if undefined
    const params = new HttpParams()
      .set('offset', page)
      .set('pageSize', size);
    return this.http.get<Donation[]>(this.url, { headers, params }).pipe(
      tap(donations => this.donationList$.next(donations))
    );
  }

  updateDonation(donation: Donation): Observable<string> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? ''),
    }
    let id = donation.id
    donation.id = undefined
    console.log(donation)
    return this.http.put<string>(this.url + `/` + id,donation,header);
  }

  getDonations(): Observable<Donation[]> {
    return this.donationList$.asObservable();
  }

  findDonationById(id:number):Observable<Donation>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<Donation>(`${this.url}/${id}`,header);
  }
}
