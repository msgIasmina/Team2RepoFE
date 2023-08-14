import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ){}

  url:string = "http://localhost:8080/users";

  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  loadUsers():Observable<User[]>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ??'')} //empty string daca e nedefinit
   return this.http.get<User[]>(this.url, header).pipe(
    tap(users => this.userList$.next(users))
  );
  }

  getUsers(): Observable<User[]> {
    return this.userList$.asObservable();
  }

  saveUser(newUser:User):Observable<User>{
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')}
    return this.http.post<User>(this.url,newUser,header)
    }
  }

  // updateUser(user:User):Observable<User>{
  //   var header = {
  //     headers: new HttpHeaders()
  //       .set("Authorization", localStorage.getItem("token") ??'')}
  //   return this.http.put<User>(this.url+`/` +`${user.id}`,user,header);
  // }



