import { Directive, Input, ElementRef, Renderer2 } from "@angular/core";

@Directive({
   selector: '[visible]'
})
export class VisibleDirective {

   @Input('visible') set expression(value: boolean) {
      const element = this.el.nativeElement as HTMLElement;
      this.renderer.setStyle(element, 'visibility', value ? 'visible' : 'hidden');
   }

   constructor(private el: ElementRef, private renderer: Renderer2) { }
}