import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
   selector: '[file-input]'
})
export class FileInputDirective {
   constructor(private ele: ElementRef, private renderer: Renderer2) {

   }

   @HostListener('click') open() {
      this.input.click();
   }

   get input() {
      const element = this.ele.nativeElement as HTMLElement;
      return element.querySelector('input');
   }
}