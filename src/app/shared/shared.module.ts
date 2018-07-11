import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceLocator } from './utils/service-locator';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { DefaultLayoutComponent } from './layouts/default/default-layout.component';
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

const pipes = [SortPipe, JoinPipe, StatusPipe, EllipsisPipe];
const directives = [LogoutDirective, ButtonMediumDirective, VisibleDirective, MobileClassDirective];

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
      ...materials
   ],
   declarations: [
      PageTitleComponent, DefaultLayoutComponent,
      AlertDialog, ConfirmDialog,
      ...directives,
      ...pipes
   ],
   entryComponents: [AlertDialog, ConfirmDialog],
   exports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      PageTitleComponent, DefaultLayoutComponent,
      ...materials,
      ...directives,
      ...pipes
   ],
   providers: [ModulePreloadingStrategy, AuthGuard, AdminGuard]
})
export class SharedModule {
   constructor(injector: Injector) {
      ServiceLocator.injector = injector;
   }
}