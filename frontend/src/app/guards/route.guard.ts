import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            if (route.data['roles'].length == localStorage.length) {
                return true;
            }
            if (route.data['roles'].includes(localStorage.getItem('userType'))) {
                return true;
            }
            return this.router.navigate(['']);
    }
  
}
