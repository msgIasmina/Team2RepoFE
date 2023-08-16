import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { BehaviorSubject, Observable,tap} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ){}

  url:string = "http://localhost:8080/users";
  url2:string = "http://localhost:8080/users";

  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  loadUsers(page: number, size: number): Observable<User[]> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    } //empty string daca e nedefinit
    return this.http.get<User[]>(`${this.url}/${page}/${size}`, header).pipe(
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
    return this.http.post<User>(this.url2,newUser,header)
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
