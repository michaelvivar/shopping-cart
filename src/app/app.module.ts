import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './services/interceptors/api.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from './store/states/app.state';

import { SharedModule } from './shared/shared.module';
import { ModulePreloadingStrategy } from './utils/preloading-strategy';

import { MatButtonModule, MatDialogModule } from '@angular/material';
const materials = [MatButtonModule, MatDialogModule];

const ngxs = [
  NgxsModule.forRoot([AppState]),
  NgxsLoggerPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot()
];

import { ServiceLocator } from './utils/service-locator';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
      { path: '', loadChildren: './pages/page.module#PageModule' }
    ], { preloadingStrategy: ModulePreloadingStrategy }),
    SharedModule,
    ...ngxs,
    ...materials
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    ModulePreloadingStrategy,
    { provide: 'API_URL', useValue: 'https://firestore.googleapis.com/v1beta1/projects/cinemax-db/databases/(default)/documents/' },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}