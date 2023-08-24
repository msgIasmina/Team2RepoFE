import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupportedBrowserGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the current browser is supported (example: check for a specific feature)
    const isSupported = this.checkBrowserSupport();

    if (isSupported) {
      return true; // Browser is supported, allow access
    } else {
      // Redirect to a browser not supported page or show an error message
      return false;
    }
  }

  private checkBrowserSupport(): boolean {
    // Implement your browser compatibility check logic here
    // Return true if the browser is supported, false otherwise
    // For example, you could check for a specific feature or version
    // You might use libraries like Modernizr or feature detection APIs
    return true; // Replace with your actual browser compatibility check
  }
}
