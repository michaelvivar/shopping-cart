import { Component } from "@angular/core";
import { Router, NavigationEnd, NavigationCancel, NavigationError, Event, NavigationStart } from "@angular/router";

@Component({
   selector: 'progress-bar',
   templateUrl: './progress-bar.template.html'
})
export class ProgressBarComponent {
   constructor(router: Router) {
      router.events.subscribe((event: Event) => {
         if (event instanceof NavigationStart) {
            this.progress = 5;
         }
         else if (event instanceof NavigationEnd) {
            this.progress = 90;
            setTimeout(_ => this.progress = 100, 1000);
         }
         else if (event instanceof NavigationCancel) {
            this.progress = 90;
            setTimeout(_ => this.progress = 100, 1000);
         }
         else if (event instanceof NavigationError) {
            this.progress = 90;
            setTimeout(_ => this.progress = 100, 1000);
         }
      })
   }
   progress: number = 100;
}