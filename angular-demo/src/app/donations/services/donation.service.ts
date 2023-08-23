import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, of, Subject, tap} from "rxjs";
import {Donation} from "../models/donation";
import {ActivatedRoute, Router} from "@angular/router";
import {Campaign} from "../../campaigns/models/campaign";
import {User} from "../../user/models/user";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  url: string = "http://localhost:8080/donations";

  donationList$: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);

  getCurrencies(): Observable<string[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<string[]>(this.url + '/currencies', { headers });
  }

  getCampaigns(): Observable<Campaign[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<Campaign[]>("http://localhost:8080/campaigns", { headers });
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<User[]>("http://localhost:8080/users", { headers });
  }
  loadDonations(filterParams: any): Observable<Donation[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    //const queryParams = this.router.getCurrentNavigation()?.extras.state;

    if (filterParams) {
      const fullUrl = this.url + '/filter' + '?' + this.serializeQueryParams(filterParams);

      return this.http.get<Donation[]>(fullUrl, { headers }).pipe(
        tap(donations => {
          this.donationList$.next(donations);
        })
      );
    } else {
      return this.http.get<Donation[]>(this.url, { headers })
    }
  }

  // private serializeQueryParams(params: any): string {
  //   return Object.keys(params)
  //     .map(key => key + '=' + params[key])
  //     .join('&');
  // }

  private serializeQueryParams(params: any): string {
    return Object.keys(params)
      .map(key => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          // Convert numbers to strings, and escape values
          const serializedValue = typeof value === 'number' ? value.toString() : encodeURIComponent(value);
          return `${key}=${serializedValue}`;
        }
        return ''; // Skip null or undefined values
      })
      .filter(param => param !== '') // Remove empty values
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

  getSize(){
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');
    return this.http.get<number>(this.url + '/size', {headers});
  }
}
