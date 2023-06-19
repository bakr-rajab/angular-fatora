import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsGuard  {
  constructor(public router: Router) { }
  canActivate() {
    if (sessionStorage.getItem('userRole') == 'user'
      // && sessionStorage.getItem('endDate') >= new Date()
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
