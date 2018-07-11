import { Directive, Renderer2, ElementRef, Input } from "@angular/core";
import { map } from 'rxjs/operators';
import { BaseComponent } from "../utils/base.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
   selector: '[mobile-class]'
})
export class MobileClassDirective extends BaseComponent {

   constructor(
      private breakpointObserver: BreakpointObserver,
      private ele: ElementRef,
      private renderer: Renderer2
   ) {
      super();
   }

   @Input('mobile-class') klass: string;
   oldKlass: string;

   ngAfterViewInit() {
      if (this.klass) {
         const element = this.ele.nativeElement as HTMLDivElement;

         element.className.split(' ').forEach(k => {
            if (k.search('col-') == 0) {
               this.oldKlass = k;
            }
         });

         const klasses = this.klass.split(' ');
         const add = klasses.filter(o => o.charAt(0) != '-');
         const remove = klasses.filter(o => o.charAt(0) == '-').map(o => o.substr(1));

         this.subscription = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)).subscribe(handset => {
            if (handset) {
               if (this.klass) {
                  if (add.length > 0) {
                     element.classList.add(...add);
                  }
                  if (remove.length > 0) {
                     element.classList.remove(...remove);
                  }
                  if (this.oldKlass) {
                     element.classList.remove(this.oldKlass);
                  }
               }
            }
            // NOT MOBILE
            else {
               if (this.klass) {
                  if (add.length > 0) {
                     element.classList.remove(...add);
                  }
                  if (remove.length > 0) {
                     element.classList.add(...remove);
                  }
                  if (this.oldKlass) {
                     element.classList.add(this.oldKlass);
                  }
               }
            }
         });
      }
   }
}