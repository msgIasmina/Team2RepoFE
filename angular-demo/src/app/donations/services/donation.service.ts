import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Donation} from "../models/donation";
import {ActivatedRoute} from "@angular/router";
import {Campaign} from "../../campaigns/models/campaign";
import {User} from "../../user/models/user";

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

  getCurrencies(): Observable<string[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<string[]>(this.url + '/currencies', { headers });
  }

  getCampaigns(): Observable<Campaign[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<Campaign[]>(this.url + '/campaigns', { headers });
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<User[]>(this.url + '/users', { headers });
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

  deleteDonation(donation: Donation){
    const header = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.delete(`${this.url}/${donation.id}`, {headers: header});
  }

  approveDonation(donation: Donation) {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');
    const userId = localStorage.getItem('userId');

    const params = new HttpParams()
      .set('donationId', donation.id)
      .set('approvedById', userId || '');

    return this.http.put(`${this.url}/approve`, null, { headers, params });
  }

}
