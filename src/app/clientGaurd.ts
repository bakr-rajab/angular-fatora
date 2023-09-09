import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("userRole", sessionStorage.getItem('userRole'))
    if (sessionStorage.getItem('userRole') == 'USER') {
      console.log('====================================');
      console.log("user gyard >>>>>>>>");
      console.log('====================================');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const ClientsGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}

// export class ClientsGuard {
//   constructor(public router: Router) { }
//   canActivate() {
//     if (sessionStorage.getItem('userRole') == 'user'
//       // && sessionStorage.getItem('endDate') >= new Date()
//     ) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
