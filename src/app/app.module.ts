import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireModule } from 'angularfire2';

import { SharedModule } from '~shared/shared.module';
import { ServiceModule } from '~services/service.module';
import { ServiceLocator } from '~utils/service-locator';
import { ModulePreloadingStrategy } from '~utils/preloading-strategy';
import { ApiInterceptor } from '~services/interceptors/api.interceptor';
import { AppState } from '~store/states/app.state';
import { environment } from '~environment/environment';

import { MatButtonModule, MatDialogModule } from '@angular/material';

const materials = [MatButtonModule, MatDialogModule];

const ngxs = [
   NgxsModule.forRoot([AppState]),
   NgxsLoggerPluginModule.forRoot(),
   NgxsReduxDevtoolsPluginModule.forRoot()
];


@NgModule({
   imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
      RouterModule.forRoot([
         { path: 'admin', loadChildren: './admin/admin.module#AdminModule', data: { preload: false } },
         { path: '', loadChildren: './pages/page.module#PageModule' }
      ], { preloadingStrategy: ModulePreloadingStrategy }),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      SharedModule.forRoot(),
      ServiceModule.forFirestore(),
      ...ngxs,
      ...materials
   ],
   declarations: [AppComponent],
   bootstrap: [AppComponent],
   providers: [
      ModulePreloadingStrategy,
      { provide: 'API_URL', useValue: 'https://firestore.googleapis.com/v1beta1/projects/cinemax-db/databases/(default)/documents/' }
   ]
})
export class AppModule {
   constructor(private injector: Injector) {
      ServiceLocator.injector = this.injector;
   }
}