import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule, STORAGE_ENGINE, StorageEngine } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AppComponent } from './app.component';
import { TestElementComponent } from './elements/test-element.component';
import { PageNotFound } from './shared/pages/page-not-found.component';


import { PageState } from '~/store/states/page.state';
import { SharedModule, AuthGuard, AdminGuard, ModulePreloadingStrategy } from '~/shared';
import { AppState } from '~/store/states/app.state';
import { environment } from '~/environments/environment';
import { ServiceModule } from '~/services/service.module';
import { DataState } from '~/store/states/data.state';
import { MyStorageEngine } from '~/store/storage-engine';

@NgModule({
   imports: [
      BrowserModule, BrowserAnimationsModule,
      RouterModule.forRoot([
         // { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canActivate: [AdminGuard], canActivateChild: [AdminGuard], data: { preload: false } },
         { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', data: { preload: false } },
         { path: '', loadChildren: './modules/main/main.module#MainModule' },
         { path: '**', component: PageNotFound }
      ], { preloadingStrategy: ModulePreloadingStrategy }),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      AngularFireStorageModule,
      NgxsModule.forRoot([AppState, PageState, DataState]),
      NgxsLoggerPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      NgxsStoragePluginModule.forRoot(),
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
      // { provide: STORAGE_ENGINE, useClass: MyStorageEngine }
   ],
   entryComponents: [TestElementComponent]
})
export class AppModule {
   constructor(injector: Injector) {

   }
}
