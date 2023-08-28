import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolePermission } from '../models/role-permission';
import { Permission } from '../../user/models/permission';
import { TextResponse } from '../../models/text-response';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  url: string = 'http://localhost:8080/roles/permissions';
  url2: string = 'http://localhost:8080/roles/';

  constructor(private http: HttpClient) {}

  loadRolePermissions(): Observable<RolePermission[]> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.get<RolePermission[]>(this.url, header);
  }

  addPermissionsToRole(
    id: number,
    permissions: Permission[],
  ): Observable<TextResponse> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.put<TextResponse>(
      this.url2 + `add/` + `${id}`,
      permissions,
      header,
    );
  }

  removePermissionsFromRole(
    id: number,
    permissions: Permission[],
  ): Observable<TextResponse> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') ?? '',
      ),
    };
    return this.http.put<TextResponse>(
      this.url2 + `remove/` + `${id}`,
      permissions,
      header,
    );
  }
}
