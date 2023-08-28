import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PermissionManagemntGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles: string[] = JSON.parse(
      localStorage.getItem('permissions') as string,
    );
    console.log(roles);
    if (roles.includes('AUTHORITY_PERMISSION_MANAGEMENT')) {
      return true;
    } else {
      this.toastr.error('Unauthorized');
      return this.router.parseUrl('/management/home');
    }
  }
}
