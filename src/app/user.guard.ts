import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {
  constructor(public router: Router) { }
  canActivate() {
    console.log("1111", new Date())
    console.log("22222", sessionStorage.getItem('endDate'))
    if (sessionStorage.getItem('userRole') == 'superAdmin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
