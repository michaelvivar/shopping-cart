import { Component, Inject, ViewChild } from "@angular/core";
import { Location } from '@angular/common';
import { Observable } from "rxjs";
import { MatSidenav } from "@angular/material";
import { Select } from "@ngxs/store";

@Component({
   templateUrl: './admin-layout.template.html',
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
})
export class AdminLayout {
   constructor(
      private location: Location,
      @Inject('TITLE') public title: string,
      @Inject('SIDENAVS') public navs: any[],
      @Inject('THEME') public theme: string
   ) {
   }

   @Select(store => store.page) page$: Observable<any>;

   @ViewChild('drawer') sidenav: MatSidenav;

   back() {
      this.location.back();
   }
}