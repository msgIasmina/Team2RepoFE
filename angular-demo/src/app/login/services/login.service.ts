import {Injectable} from '@angular/core';
import { catchError, tap, throwError} from "rxjs";
import {LoginResponse} from "../models/login-response";
import {LoginRequest} from "../models/login-request";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:8080/auth/login";
  constructor(
    private http: HttpClient
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

}
