import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  url: string = 'http://localhost:8080/roles';

  userRolesList$: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);

  loadRoles(): Observable<Role[]> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    }; //empty string daca e nedefinit
    return this.http
      .get<Role[]>(this.url, header)
      .pipe(tap((roles) => this.userRolesList$.next(roles)));
  }

  getRoles(): Observable<Role[]> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.get<Role[]>(this.url, header);
  }

  constructor(private http: HttpClient) {}
}
