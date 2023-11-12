import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivate, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core'
import { LocalStorageService } from './service-layer/local-storage.service';
@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router,private localStorage:LocalStorageService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const role = this.localStorage.getItem('userRole')

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

