import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Directive({
   selector: '[input-currency]',
   providers: [CurrencyPipe]
})
export class InputCurrencyDirective {

   constructor(
      private ele: ElementRef,
      private renderer: Renderer2,
      private input: NgControl,
      private currencyPipe: CurrencyPipe
   ) { }

   ngOnInit() {
      const value = this.input.control.value;
      const amount = this.currencyPipe.transform(value, 'Php ');
      this.input.control.setValue(amount);
   }

   @HostListener('focusout') focusout() {
      const value = (this.input.control.value || '').replace(/[^0-9\.]/g, '');
      const amount = this.currencyPipe.transform(value, 'Php ');
      this.input.control.setValue(amount);
   }
}