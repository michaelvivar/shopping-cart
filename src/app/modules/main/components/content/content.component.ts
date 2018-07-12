import { Input, OnInit, ViewChild, ComponentFactoryResolver, Component, ViewContainerRef, ComponentFactory } from '@angular/core';
import { ContentDirective } from './content.directive';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { DefaultLayout, MobileLayout } from '~/shared';

@Component({
   templateUrl: './content.template.html'
})
export class ContentComponent implements OnInit {
   @Input() contents: any[];
   currentAdIndex = -1;
   @ViewChild(ContentDirective) contentHost: ContentDirective;

   constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private breakpointObserver: BreakpointObserver,
   ) { }

   isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)

   ngOnInit() {
      let viewContainerRef: ViewContainerRef;
      let componentFactory: ComponentFactory<any>;

      this.isHandset$.subscribe(data => {
         if (data.matches) {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(MobileLayout);
         }
         else {
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(DefaultLayout);
         }
         if (componentFactory) {
            viewContainerRef = this.contentHost.viewContainerRef;
            if (viewContainerRef) {
               viewContainerRef.clear();
            }
            viewContainerRef.createComponent(componentFactory);
         }
      })
   }
}