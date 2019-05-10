import {LocalStorageService} from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import {Router, CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private localStorage: LocalStorageService,
    private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger;
    if(this.localStorage.retrieve('userId')){
      return true;
    }else{
      this.router.navigate['/login'];
      return false;
    }
  }
  
}
