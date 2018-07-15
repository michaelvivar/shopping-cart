import { Directive, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';

@Directive({
   selector: '[image-fit]'
})
export class ImageFitDirective {

   constructor(private el: ElementRef, private renderer: Renderer2) { }

   @Input('image-fit') max: number = 240;

   ngAfterViewChecked() {
      const element = this.el.nativeElement as HTMLImageElement;
      if (element.naturalWidth > element.naturalHeight) {
         if (240 < element.naturalWidth) {
            this.renderer.setStyle(element, 'width', '100%');
         }
      }
      else {
         if (240 < element.naturalHeight) {
            this.renderer.setStyle(element, 'height', '100%');
         }
      }
   }
}