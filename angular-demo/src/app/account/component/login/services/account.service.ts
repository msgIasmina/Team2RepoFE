import {Injectable} from '@angular/core';
import {catchError, Observable, tap, throwError} from "rxjs";
import {LoginResponse} from "../models/login-response";
import {LoginRequest} from "../models/login-request";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../../user/models/user";
import {Router} from "@angular/router";
import {APIEndpointURLs} from "../../../../../api-endpoint-urls";
import {TextResponse} from "../../../../models/text-response";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = "http://localhost:8080/auth/login";
  firstLoginUrl :string = "http://localhost:8080/users"

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
        localStorage.setItem("username", response.username as string);
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

  firstLoginUpdate(id:string|null, pd:string): Observable<TextResponse>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.put<TextResponse>(this.firstLoginUrl + `/` + id +"/firstLogin", {password:pd}, header);
  }

}
