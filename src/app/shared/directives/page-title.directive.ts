import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseDirective } from '../utils/base.directive';

@Directive({
   selector: '[page-title]'
})
export class PageTitleDirective extends BaseDirective {

   constructor(private el: ElementRef, private renderer: Renderer2) { super() }

   @Select(store => store.page.title) title$: Observable<any>;

   ngOnInit() {
      const element = this.el.nativeElement as HTMLElement;
      this.subscription = this.title$.subscribe(title => {
         if (title) {
            element.innerHTML = title;
            this.renderer.removeStyle(element, 'display');
         }
         else {
            element.innerHTML = '';
            this.renderer.setStyle(element, 'display', 'none');
         }
      });
   }
}