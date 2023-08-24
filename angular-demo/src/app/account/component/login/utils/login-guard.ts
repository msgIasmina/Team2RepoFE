import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn:"root"
})
export  class LoginGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const logged: string | null = localStorage.getItem("logged");
    const newUser: string | null = localStorage.getItem("newUser");
        if(logged === "true"){
          if(newUser === "true"){
            this.router.navigate(["/firstLogin"])
          }else{
            return true;
          }
        }else{
          return  this.router.parseUrl("/login");
        }
          return true;
      }
}
