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

@NgModule({
   imports: [
      BrowserModule, FormsModule, BrowserAnimationsModule,
      RouterModule.forRoot([
         { path: 'account', loadChildren: '~/modules/account/account.module#AccountModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
         { path: 'admin', loadChildren: '~/modules/admin/admin.module#AdminModule', canActivate: [AdminGuard], data: { preload: false } },
         { path: '', loadChildren: '~/modules/main/main.module#MainModule' }
      ], { preloadingStrategy: ModulePreloadingStrategy }),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      NgxsModule.forRoot([AppState, PageState]),
      NgxsLoggerPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      SharedModule,
      ServiceModule.forFirestore()
   ],
   declarations: [AppComponent],
   bootstrap: [AppComponent],
   providers: [
      { provide: 'TITLE', useValue: 'Application' },
      { provide: 'COLOR', useValue: 'primary' },
      {
         provide: 'SIDENAVS',
         useValue: [
            { label: 'Home', link: '', icon: 'home' },
            { label: 'Categories', link: '/categories', icon: 'category' },
            { label: 'Cart', link: '/cart', icon: 'shopping_cart' },
            { label: 'Account', link: '/account', icon: 'account_circle' }
         ]
      }
   ]
})
export class AppModule {
}
