import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { BehaviorSubject, Observable,tap} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {TextResponse} from "../../models/text-response";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ){}

  url:string = "http://localhost:8080/users";

  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  totalItems$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  loadUsers(page: number, size: number): Observable<User[]> {
    const headers = new HttpHeaders()
      .set("Authorization", localStorage.getItem("token") ?? '');

    const params: any = {};
    params['offset'] = page;
    params['pageSize'] = size;

    return this.http.get<User[]>(this.url, { headers, params }).pipe(
      tap(users => this.userList$.next(users))
    );
  }

  getUsers(): Observable<User[]> {
    return this.userList$.asObservable();
  }

  getSize(): Observable<number> {
    const headers = new HttpHeaders()
      .set("Authorization", localStorage.getItem("token") ?? '');

    return this.http.get<number>(this.url + '/size', { headers }).pipe(
      tap(size => this.totalItems$.next(size))
    );
  }

  saveUser(newUser:User):Observable<TextResponse>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')}
    return this.http.post<TextResponse>(this.url,newUser,header)
    }
  updateUser(user: User): Observable<TextResponse> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? ''),
    }
    let id = user.id
    user.id = undefined
    return this.http.put<TextResponse>(this.url + `/` + id,user,header);
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
