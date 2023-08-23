import {Injectable} from '@angular/core';
import {catchError, Observable, tap, throwError} from "rxjs";
import {LoginResponse} from "../models/login-response";
import {LoginRequest} from "../models/login-request";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../../user/models/user";
import {Router} from "@angular/router";
import {APIEndpointURLs} from "../../../../../api-endpoint-urls";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = "http://localhost:8080/auth/login";

  private readonly TOKEN = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(this.url,loginRequest).pipe(
      tap(response => {
        localStorage.setItem("token",response.token);
        localStorage.setItem("permissions",JSON.stringify(response.permissions));
        if(response.newUser){
          localStorage.setItem("newUser","true");
        }else{
          localStorage.setItem("newUser","false");
        }
        localStorage.setItem("logged","true")
        localStorage.setItem("userId",JSON.stringify(response.id))
      }),
      catchError(this.handleError)
    );
  }

 isLoggedIn(): boolean {
    const jwt = new JwtHelperService();
    const token = localStorage.getItem(this.TOKEN);
    return !jwt.isTokenExpired(token);
  }

  registerUser(user: User) {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const isAdmin = permissions.includes('AUTHORITY_USER_MANAGEMENT');
    if (!isAdmin) {
      window.alert("'User does not have USER management permission.");
      return throwError('User does not have USER_MANAGEMENT permission.');
    }
    return this.http.post(APIEndpointURLs.registerUrl, user);
  }


}
