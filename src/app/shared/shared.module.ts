import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceLocator } from './utils/service-locator';
import { DefaultLayout } from './layouts/default/default-layout.component';
import { SortPipe } from './pipes/sort.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LogoutDirective } from './directives/logout.directive';
import { ModulePreloadingStrategy } from './utils/preloading-strategy';
import { ButtonMediumDirective } from './directives/button-medium.directive';
import { AlertDialog } from './components/alert-dialog/alert-dialog.component';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';
import { VisibleDirective } from './directives/visible.directive';
import { MobileClassDirective } from './directives/mobile-class.directive';
import { materials } from './ng-materials';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { MobileLayout } from './layouts/mobile/mobile-layout.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { PageTitleDirective } from './directives/page-title.directive';
import { InputCurrencyDirective } from './directives/input-currency.directive';
import { ImageFitDirective } from './directives/image-fit.directive';

const pipes = [SortPipe, JoinPipe, StatusPipe, EllipsisPipe];
const directives = [
   LogoutDirective, ButtonMediumDirective, VisibleDirective, MobileClassDirective,
   PageTitleDirective, InputCurrencyDirective, ImageFitDirective
];

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
      ...materials
   ],
   declarations: [
      DefaultLayout, MobileLayout,
      AlertDialog, ConfirmDialog, ProgressBarComponent,
      BackButtonComponent, LoginFormComponent, SignupFormComponent,
      ...directives,
      ...pipes
   ],
   exports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      DefaultLayout, MobileLayout,
      ProgressBarComponent, BackButtonComponent, LoginFormComponent,
      SignupFormComponent,
      ...materials,
      ...directives,
      ...pipes
   ],
   entryComponents: [AlertDialog, ConfirmDialog],
   providers: [ModulePreloadingStrategy, AuthGuard, AdminGuard]
})
export class SharedModule {
   constructor(injector: Injector) {
      ServiceLocator.injector = injector;
   }
}