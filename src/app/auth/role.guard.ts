import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private service: UserService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    let roles = localStorage.getItem('userType');
    if (roles) {
      if (roles == '2') return true;
      else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    return true;
  }


}
