import { Component, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { RouterService } from '../../services/router.service';
import { Location } from '@angular/common';
import { Select } from '@ngxs/store';

@Component({
   selector: 'app-root',
   templateUrl: './default-layout.template.html',
   styles: [`
    .sidenav-container {
        height: 100%;
    }
    .sidenav {
        width: 230px;
        box-shadow: 1px 0 2px rgba(0,0,0,.24);
    }
    .logo {
       width: 30px;
       margin: 0 10px;
    }
    .page-title {
      padding: 0 15px;
   }
  `],
   providers: [RouterService]
})
export class DefaultLayout {

   constructor(
      private breakpointObserver: BreakpointObserver,
      private location: Location,
      @Inject('TITLE') public title: string,
      @Inject('SIDENAVS') public navs: any[],
      @Inject('THEME') public theme: string
   ) { }

   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
         map(result => result.matches)
      ).pipe(tap(value => this.handset = value));

   handset: boolean;

   @Select(store => store.page) page$: Observable<any>;

   @ViewChild('drawer') sidenav: MatSidenav;

   closeSideNav() {
      if (this.handset) {
         setTimeout(() => this.sidenav.close(), 0);
      }
   }

   back() {
      this.location.back();
   }
}