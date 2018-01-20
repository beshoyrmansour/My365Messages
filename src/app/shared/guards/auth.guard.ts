import { UserComponent } from './../../user/user.component';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanLoad, CanDeactivate } from '@angular/router/src/interfaces';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanDeactivate<UserComponent> {
  canDeactivate(component: UserComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('token') && !(nextState.url.includes('/messages/'))) {
      return false;
    } else {
      return true;
    }
  }
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      console.log('Unauthorized access request is detected');
      return false;
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      console.log('Unauthorized access request is detected');
      return false;
    }
  }
}
