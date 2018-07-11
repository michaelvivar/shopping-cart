import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
   selector: '[btn-md]'
})
export class ButtonMediumDirective {
   constructor(private ele: ElementRef, private renderer: Renderer2) { }

   ngOnInit() {
      this.renderer.setStyle(this.ele.nativeElement, 'line-height', '30px');
      this.renderer.setStyle(this.ele.nativeElement, 'min-width', '50px');
   }
}