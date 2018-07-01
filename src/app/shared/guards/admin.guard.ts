import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

   constructor(private router: Router) { }

   @Select(store => store.app.user) user$: Observable<any>;

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.user$.pipe(map(user => {
         return (user && user.type == 'admin') ? true : false;
      }))
         .pipe(tap(value => {
            if (!value) {
               this.router.navigate(['/']);
            }
         }))
   }
}