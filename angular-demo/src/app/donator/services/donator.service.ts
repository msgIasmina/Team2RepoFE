import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Role } from '../../user/models/role';
import { Donator } from '../models/donator';
import { User } from '../../user/models/user';
import { ToastrService } from 'ngx-toastr';
import { DonatorPair } from '../models/DonatorPair';
import { Donation } from '../../donations/models/donation';

@Injectable({
  providedIn: 'root',
})
export class DonatorService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  url: string = 'http://localhost:8080/donators';

  donatorList$: BehaviorSubject<Donator[]> = new BehaviorSubject<Donator[]>([]);
  totalItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  loadDonators(page: number, size: number): Observable<Donator[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') ?? '',
    );

    const params: any = {};
    params['offset'] = page;
    params['pageSize'] = size;

    return this.http
      .get<Donator[]>(this.url, {
        headers,
        params,
      })
      .pipe(tap((donators) => this.donatorList$.next(donators)));
  }

  getSize(): Observable<number> {
    const headers = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') ?? '',
    );

    return this.http
      .get<number>(this.url + '/size', { headers })
      .pipe(tap((size) => this.totalItems$.next(size)));
  }

  loadDonators2(): Observable<Donator[]> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http
      .get<Donator[]>(this.url, header)
      .pipe(tap((donators) => this.donatorList$.next(donators)));
  }

  getDonators(): Observable<Donator[]> {
    return this.donatorList$.asObservable();
  }

  saveDonator(newDonator: Donator): Observable<Donator> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.post<User>(this.url, newDonator, header);
    // return this.http.post<User>(this.url2,newDonator,header)
  }

  deleteDonator(donator: Donator) {
    const headers = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') ?? '',
    );

    return this.http.delete(`${this.url}/${donator.id}`, { headers });
  }

  updateDonator(donator: Donator): Observable<string> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    let id = donator.id;
    donator.id = undefined;
    return this.http.put<string>(this.url + `/` + id, donator, header);
  }

  findDonatorById(id: number): Observable<Donator> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.get<Donator>(`${this.url}/${id}`, header);
  }
}
