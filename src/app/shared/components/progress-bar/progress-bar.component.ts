import { Component } from "@angular/core";
import { Router, NavigationEnd, NavigationCancel, NavigationError, Event, NavigationStart } from "@angular/router";
import { trigger, transition, style, group, query, animate, state, keyframes } from "@angular/animations";

@Component({
   selector: 'progress-bar',
   templateUrl: './progress-bar.template.html',
   animations: [
      trigger('progressAnimation', [
         state('100', style({ opacity: 0 })),
         transition('void => *', [
            animate(1000, keyframes([
               style({ opacity: 0 }),
               style({ opacity: 0.5 }),
               style({ opacity: 1 })
            ]))
         ]),
         transition('* => void', [
            animate(1000, keyframes([
               style({ opacity: 1 }),
               style({ opacity: 0.5 }),
               style({ opacity: 0 })
            ]))
         ])
      ])
   ]
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