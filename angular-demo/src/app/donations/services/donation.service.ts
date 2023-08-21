import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Donation} from "../models/donation";
import {Donator} from "../../donator/models/donator";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
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
    return this.http.put<string>(this.url + `/` + id, donation, header);
  }
  loadFilteredDonations(): Observable<Donation[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    // Retrieve query parameters from the ActivatedRoute
    const queryParams = this.activatedRoute.snapshot.queryParams;

    // Construct the full URL
    const fullUrl = this.url + '/filter' + '?' + this.serializeQueryParams(queryParams);

    return this.http.get<Donation[]>(fullUrl, { headers }).pipe(
      tap(donations => {
        this.donationList$.next(donations);
      })
    );
  }

// Helper function to serialize query parameters
  private serializeQueryParams(params: any): string {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
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
  deleteDonation(donation: Donation){
    const header = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.delete(`${this.url}/${donation.id}`, {headers: header});
  }

  approveDonation(donation: Donation) {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');
    const userId = localStorage.getItem('userId');

    const params = new HttpParams()
      .set('donationId', donation.id.toString())
      .set('approvedById', userId || '');

    return this.http.put(`${this.url}/approve`, null, { headers, params });
  }

}
