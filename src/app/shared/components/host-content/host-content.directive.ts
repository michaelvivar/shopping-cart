import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
   selector: '[content-host]',
})
export class HostContentDirective {
   constructor(public viewContainerRef: ViewContainerRef) { }
}