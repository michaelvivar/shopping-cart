import { ViewContainerRef, ComponentFactory } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { DefaultLayout, MobileLayout, HostContentComponent, ServiceLocator } from '~/shared';

export class ContentComponent extends HostContentComponent {

   loadContent() {
      const breakpointObserver = ServiceLocator.injector.get(BreakpointObserver);
      const isHandset$: Observable<BreakpointState> = breakpointObserver.observe(Breakpoints.Handset)

      let viewContainerRef: ViewContainerRef;
      let componentFactory: ComponentFactory<any>;

      isHandset$.subscribe(data => {
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