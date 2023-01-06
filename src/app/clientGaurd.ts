import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsGuard implements CanActivate {
  constructor(public router: Router){}
  canActivate(){
      if(sessionStorage.getItem('userRole') == 'user'){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
