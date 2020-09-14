import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService : UserService, private router : Router) { }
  canActivate() : boolean {
    this.userService.getUserId(localStorage.getItem('accessToken')).subscribe(data => {
      if(data.length <= 0) {
        this.router.navigate(['/']);
        return false;
      }
    })
   return true;
  }
}
