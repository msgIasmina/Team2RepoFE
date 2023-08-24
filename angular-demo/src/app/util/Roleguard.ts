import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate{

  constructor(private router:Router){}
  roles:string[];
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userRole:string[];
    const receivedRole = route.data['role'];

    let userDataString = localStorage.getItem("user");
    if (userDataString) {
      let userData = JSON.parse(userDataString);
      this.roles = userData.roles;
    }
    else {
      console.log("User data not found in local storage.");
    }
    userRole=this.roles;
    console.log(userRole.find(role=>role===receivedRole))

    if(userRole.find(role=>role===receivedRole)){
      return true;
    }
    else{
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
