import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivate, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core'
@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //your logic goes here
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

export const UserGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
// export class UserGuard implements CanActivate {
//   constructor(private router: Router) { }
//   canActivate() {
//     console.log("1111", new Date())
//     console.log("22222", sessionStorage.getItem('endDate'))
//     if (sessionStorage.getItem('userRole') == 'superAdmin') {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
