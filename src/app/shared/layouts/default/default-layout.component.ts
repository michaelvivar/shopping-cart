import { Component, ViewChild, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
   selector: 'app-root',
   templateUrl: './default-layout.template.html',
   styles: [`
    .sidenav-container {
        height: 100%;
    }
    .sidenav {
        width: 200px;
        box-shadow: 3px 0 6px rgba(0,0,0,.24);
    }
  `]
})
export class DefaultLayoutComponent {

   constructor(
      router: Router,
      private breakpointObserver: BreakpointObserver,
      @Inject('TITLE') public title: string,
      @Inject('SIDENAVS') public navs: any[],
      @Inject('COLOR') public color: string
   ) {

      router.events.subscribe((event: Event) => {
         if (event instanceof NavigationStart) {
            this.progress = 5;
         }
         else if (event instanceof NavigationEnd) {
            this.progress = 100;
         }
         else if (event instanceof NavigationCancel) {
            this.progress = 100;
         }
         else if (event instanceof NavigationError) {
            router.navigate(['error']);
         }
      })
   }

   progress: number = 0;

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
         map(result => result.matches)
      ).pipe(tap(value => this.handset = value));

   handset: boolean;

   @ViewChild('drawer') sidenav: MatSidenav;

   close() {
      if (this.handset) {
         setTimeout(() => this.sidenav.close(), 0);
      }
   }
}