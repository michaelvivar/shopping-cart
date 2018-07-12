import { Component, Inject } from "@angular/core";

@Component({
   templateUrl: './mobile-layout.template.html',
   styles: [
      `
      .nav-bottom .mat-grid-list {
         position: fixed;
         bottom: 0;
         left: 0;
         z-index: 100;
         width: 100%;
         height: 100px;
         font-size: 10px;
      }
      .nav-bottom .mat-grid-list button {
         color: white !important;
      }
      `
   ]
})
export class MobileLayout {
   constructor(@Inject('THEME') public theme: string) { }
}