import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { BehaviorSubject, Observable,tap} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {UserPair} from "../models/UserPair";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ){}

  url:string = "http://localhost:8080/users";

  userPair$: BehaviorSubject<UserPair> = new BehaviorSubject<UserPair>(new UserPair([],0));

  loadUsers(page: number, size: number): Observable<UserPair> {
    const headers = new HttpHeaders()
      .set("Authorization", localStorage.getItem("token") ?? '');

    const params: any = {};
    params['offset'] = page;
    params['pageSize'] = size;

    return this.http.get<UserPair>(this.url, { headers, params }).pipe(
      tap(userPair => this.userPair$.next(userPair))
    );
  }


  getUsers(): Observable<UserPair> {
    return this.userPair$.asObservable();
  }

  saveUser(newUser:User):Observable<User>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')}
    return this.http.post<User>(this.url,newUser,header)
    }
  updateUser(user: User): Observable<string> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? ''),
    }
    let id = user.id
    user.id = undefined
    console.log(user)
    return this.http.put<string>(this.url + `/` + id,user,header);
  }

  findUserById(id:number):Observable<User>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<User>(`${this.url}/${id}`,header);
  }
  toggleActivation(user: User): Observable<User> {
    const url = `${this.url}/${user.id}/activation`;

    const header = new HttpHeaders()
      .set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.put<User>(url, null, { headers: header });

  }
}
