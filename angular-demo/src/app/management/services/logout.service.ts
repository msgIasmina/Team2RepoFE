import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  url: string = "http://localhost:8080/auth/logout/";
  constructor(private http:HttpClient) { }

  logout(){
    const userId:string|null=localStorage.getItem("userId")
    return this.http.delete(this.url+userId,{responseType:'text'})
  }
}
