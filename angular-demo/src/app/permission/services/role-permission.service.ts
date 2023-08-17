import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {RolePermission} from "../models/role-permission";
import {User} from "../../user/models/user";
import {Permission} from "../../user/models/permission";

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {


  constructor(
    private http: HttpClient
  ) {
  }

  url: string = "http://localhost:8080/roles/permissions/";
  url2: string = "http://localhost:8080/roles/";


  loadRolePermissions(id: number): Observable<RolePermission[]> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.get<RolePermission[]>(this.url + `${id}`, header);
  }

  addPermissionsToRole(id: number, permissions: Permission[]): Observable<string> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.put<string>(this.url2 + `add/` + `${id}`, permissions, header);
  }

  removePermissionsFromRole(id: number, permissions: Permission[]): Observable<string> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token") ?? '')
    }
    return this.http.put<string>(this.url2 + `remove/` + `${id}`, permissions, header);
  }
}
