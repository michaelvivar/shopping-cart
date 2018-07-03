import { Directive, HostListener, ElementRef, Input, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
   selector: '[time-input]'
})
export class TimeInputDirective {

   constructor(private ele: ElementRef, private control: NgControl) {

   }

   ngAfterViewInit() {
      this.paddingZero();
   }

   @Input('time-input') type: string;

   get element() {
      return this.ele.nativeElement as HTMLInputElement;
   }

   active = false;

   @HostListener('focus') focus() {
      this.active = true;
   }

   @HostListener('focusout') focusout() {
      this.active = false;
      this.paddingZero();
   }

   @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      if (!this.active) {
         return;
      }
      if (event.key === "ArrowUp") {
         this.up();
      }
      else if (event.key === 'ArrowDown') {
         this.down();
      }
   }

   get value() {
      return isNaN(parseInt(this.element.value)) ? 0 : parseInt(this.element.value);
   }

   paddingZero() {
      if (this.value < 10) {
         this.element.value = '0' + this.value;
      }
   }

   up() {
      const max = this.type == 'hour' ? 12 : 49;
      if (this.value < max) {
         const value = this.value + (max == 12 ? 1 : 10);
         this.control.control.setValue(value);
      }
   }

   down() {
      if (this.value != 0) {
         const value = this.value - (this.type == 'hour' ? 1 : 10);
         this.control.control.setValue(value);
      }
   }
}