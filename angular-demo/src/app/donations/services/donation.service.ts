import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Donation} from "../models/donation";
import {ActivatedRoute, Router} from "@angular/router";
import {Campaign} from "../../campaigns/models/campaign";
import {User} from "../../user/models/user";
import {UserService} from "../../user/services/user-service.service";
import {DonationFilterPair} from "../models/DonationFilterPair";
import {Visualizer} from "../../util/visualizer.service";


@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private visualizer: Visualizer
  ) {
  }

  url: string = "http://localhost:8080/donations";

  donationFilterPair$: BehaviorSubject<DonationFilterPair> =
    new BehaviorSubject<DonationFilterPair>(new DonationFilterPair([],0));

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
  loadDonations(filterParams: any): Observable<DonationFilterPair> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

      const fullUrl = this.url + '/filter' + '?' + this.visualizer.serializeQueryParams(filterParams);

      return this.http.get<DonationFilterPair>(fullUrl, { headers }).pipe(
        tap(donationFilterPair => {
          this.donationFilterPair$.next(donationFilterPair);
        })
      );
  }

  getDonationFilterPair(): Observable<DonationFilterPair> {
    return this.donationFilterPair$.asObservable();
  }

  deleteDonation(donation: Donation){
    const header = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.delete(`${this.url}/${donation.id}`, {headers: header});
  }

  approveDonation(donation: Donation) {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');
    const userId = localStorage.getItem('userId');

    const params = new HttpParams()
      .set('donationId', donation.id || '')
      .set('approvedById', userId || '');

    return this.http.put(`${this.url}/approve`, null, { headers, params });
  }

  addDonation(newDonation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.url, newDonation);
  }

  updateDonation(donation: Donation): Observable<Donation> {
    let id = donation.id
    return this.http.put<Donation>(this.url + `/` + id, donation);
  }

  findDonationById(id:number):Observable<Donation>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<Donation>(`${this.url}/${id}`,header);
  }
}
