import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Donator } from '../models/donator';
import { ToastrService } from 'ngx-toastr';
import { TextResponse } from '../../models/text-response';

@Injectable({
  providedIn: 'root',
})
export class DonatorService {
  url: string = 'http://localhost:8080/donators';
  donatorList$: BehaviorSubject<Donator[]> = new BehaviorSubject<Donator[]>([]);
  totalItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

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

  saveDonator(newDonator: Donator): Observable<TextResponse> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.post<TextResponse>(this.url, newDonator, header);
  }

  deleteDonator(donator: Donator) {
    const headers = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') ?? '',
    );

    return this.http.delete(`${this.url}/${donator.id}`, { headers });
  }

  updateDonator(donator: Donator): Observable<TextResponse> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    let id = donator.id;
    donator.id = undefined;
    return this.http.put<TextResponse>(this.url + `/` + id, donator, header);
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
