import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login-request';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { TextResponse } from '../../../../models/text-response';
import { RenewToken } from '../models/renewToken';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url: string = 'http://localhost:8080/auth';
  firstLoginUrl: string = 'http://localhost:8080/users';

  private readonly TOKEN = 'token';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post<LoginResponse>(this.url + '/login', loginRequest, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem(
            'permissions',
            JSON.stringify(response.permissions),
          );
          localStorage.setItem('username', response.username as string);
          if (response.newUser) {
            localStorage.setItem('newUser', 'true');
          } else {
            localStorage.setItem('newUser', 'false');
          }
          localStorage.setItem('logged', 'true');
          localStorage.setItem('userId', JSON.stringify(response.id));
        }),
        catchError(this.handleError),
      );
  }

  firstLoginUpdate(id: string | null, pd: string): Observable<TextResponse> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.put<TextResponse>(
      this.firstLoginUrl + `/` + id + '/firstLogin',
      { password: pd },
      header,
    );
  }

  refreshToken() {
    return this.http
      .get<RenewToken>(this.url + '/refreshToken', { withCredentials: true })
      .pipe(
        tap((response) => {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.renewedAccesToken);
        }),
      );
  }
}
