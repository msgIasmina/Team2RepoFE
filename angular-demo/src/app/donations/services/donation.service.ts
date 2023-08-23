import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Donation} from "../models/donation";
import {UserService} from "../../user/services/user-service.service";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
  }

  url: string = "http://localhost:8080/donations";

  donationList$: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);

  loadDonations(page: number, size: number): Observable<Donation[]> {
    const headers = new HttpHeaders()
      .set("Authorization", localStorage.getItem("token") ?? ''); // empty string if undefined
    const params = new HttpParams()
      .set('offset', page)
      .set('pageSize', size);
    return this.http.get<Donation[]>(this.url, {headers, params}).pipe(
      tap(donations => this.donationList$.next(donations))
    );
  }

  getDonations(): Observable<Donation[]> {
    return this.donationList$.asObservable();
  }

  getCurrencies(): Observable<string[]> {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<string[]>(this.url + '/currencies', {headers});
  }

  addDonation(newDonation: Donation): Observable<Donation> {
    const userId =parseInt( localStorage.getItem('userId') || '');
    // this.userService.findUserById(userId).subscribe((user) =>
    // {
    //   newDonation.createdBy = user;
    // })

    return this.http.post<Donation>(this.url, newDonation);
  }

  updateDonation(donation: Donation): Observable<Donation> {
    let id = donation.id
    //donation.id = undefined
    console.log(donation)
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
