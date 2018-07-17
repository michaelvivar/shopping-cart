import { OnInit, ViewChild, ComponentFactoryResolver, Component } from '@angular/core';
import { HostContentDirective } from './host-content.directive';

@Component({
   templateUrl: './host-content.template.html'
})
export class HostContentComponent implements OnInit {
   @ViewChild(HostContentDirective) contentHost: HostContentDirective;

   constructor(
      protected componentFactoryResolver: ComponentFactoryResolver,
   ) { }

   ngOnInit() {
      this.loadContent();
   }

   loadContent() {

   }
}