import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './service-layer/local-storage.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('userRole', this.localStorage.getItem('userRole'));
    if (this.localStorage.getItem('userRole') == 'USER') {
      console.log('====================================');
      console.log('user gyard >>>>>>>>');
      console.log('====================================');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const ClientsGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
