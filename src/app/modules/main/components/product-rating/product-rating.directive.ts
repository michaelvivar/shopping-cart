import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
   selector: '[rating]',
})
export class ProductRatingDirective {

   constructor(private el: ElementRef, private renderer: Renderer2) { }

   @Input('rating') rating: number = 0;
   @Input('value') value: number = 0;

   ngAfterContentChecked() {
      if (this.rating > 0 && this.value) {
         if (this.rating >= this.value && this.rating < (this.value + 0.5)) {
            this.renderer.setAttribute(this.el.nativeElement, 'checked', 'checked');
         }
         else {
            this.renderer.removeAttribute(this.el.nativeElement, 'checked');
         }
      }
   }
}