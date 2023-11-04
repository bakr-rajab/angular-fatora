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
    const role = sessionStorage.getItem('userRole')
    console.log({ role });

    if (role === 'SUPERADMIN' || role === 'ADMIN') {
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

