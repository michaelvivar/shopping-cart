import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { PageState } from '~/store/states/page.state';
import { SharedModule, AuthGuard, AdminGuard, ModulePreloadingStrategy } from '~/shared';
import { RouterModule } from '@angular/router';
import { AppState } from '~/store/states/app.state';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '~/environments/environment';
import { ServiceModule } from '~/services/service.module';
import { TestElementComponent } from './elements/test-element.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
   imports: [
      BrowserModule, BrowserAnimationsModule,
      RouterModule.forRoot([
         { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canActivate: [AdminGuard], canActivateChild: [AdminGuard], data: { preload: false } },
         { path: '', loadChildren: './modules/main/main.module#MainModule' }
      ], { preloadingStrategy: ModulePreloadingStrategy }),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      NgxsModule.forRoot([AppState, PageState]),
      NgxsLoggerPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      SharedModule,
      ServiceModule.forFirestore()
   ],
   declarations: [AppComponent, TestElementComponent],
   bootstrap: [AppComponent],
   providers: [
      { provide: 'TITLE', useValue: 'Application' },
      { provide: 'THEME', useValue: 'default-theme' },
      {
         provide: 'SIDENAVS',
         useValue: [
            { label: 'Home', link: '', icon: 'home' },
            { label: 'Categories', link: '/categories', icon: 'category' },
            { label: 'Cart', link: '/cart', icon: 'shopping_cart' },
            { label: 'Account', link: '/account', icon: 'account_circle' }
         ]
      }
   ],
   entryComponents: [TestElementComponent]
})
export class AppModule {
   constructor(injector: Injector) {
      const ele = createCustomElement(TestElementComponent, { injector: injector });
      customElements.define('my-form', ele);
   }
}
