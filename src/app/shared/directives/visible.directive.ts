import { Directive, Input, ElementRef, Renderer2 } from "@angular/core";

@Directive({
   selector: '[visible]'
})
export class VisibleDirective {

   @Input('visible') set expression(value: boolean) {
      const element = this.el.nativeElement as HTMLElement;
      if (value) {
         this.renderer.setStyle(element, 'opacity', 1);
         this.renderer.setStyle(element, 'visibility', 'visible');
         //this.renderer.setStyle(element, 'transition', 'visibility 0s 1s, opacity 1s linear');
      }
      else {
         this.renderer.setStyle(element, 'opacity', 0);
         this.renderer.setStyle(element, 'transition', 'visibility 0s 1s, opacity 1s linear');
      }
   }

   constructor(private el: ElementRef, private renderer: Renderer2) { }
}