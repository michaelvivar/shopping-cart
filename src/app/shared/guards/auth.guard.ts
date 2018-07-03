import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

   constructor(private router: Router) { }

   @Select(store => store.app.user) user$: Observable<any>;

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.user$.pipe(map(user => {
         if (user || state.url == '/account/login' || state.url == '/account/signup') {
            return true;
         }
         return false;
      })).pipe(tap(value => {
         if (!value) {
            this.router.navigate(['/account/login']);
         }
      }))
   }

   canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(next, state);
   }
}