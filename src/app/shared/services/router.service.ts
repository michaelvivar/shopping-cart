import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RouterService {

   private previousUrl: string;
   private currentUrl: string;
   paths: string[] = [];

   constructor(router: Router) {
      this.currentUrl = router.url;
      this.paths = [router.url];
      router.events.subscribe(event => {
         if (event instanceof NavigationEnd) {
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
            if (this.paths.indexOf(event.url) == -1) {
               if (event.url == '/') {
                  this.paths = [event.url];
               }
               else {
                  this.paths.unshift(event.url);
               }
            }
         };
      });
   }

   public getPreviousUrl() {
      if (this.paths.length > 1) {
         const prev = this.paths[1];
         this.paths.shift();
         return prev;
      }
      else {
         return null;
      }
   }
}
