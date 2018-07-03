import { NgModule, Injector, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceLocator } from './utils/service-locator';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { DefaultLayoutComponent } from './layouts/default/default-layout.component';
import {
   MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule,
   MatProgressBarModule, MatInputModule, MatCardModule, MatFormFieldModule, MatButtonModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SortPipe } from './pipes/sort.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LogoutDirective } from './directives/logout.directive';
import { ModulePreloadingStrategy } from './utils/preloading-strategy';

const pipes = [SortPipe, JoinPipe, StatusPipe];

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
      ...[
         MatSidenavModule, MatToolbarModule, MatIconModule,
         MatListModule, MatProgressBarModule, MatCardModule,
         MatFormFieldModule, MatInputModule, MatButtonModule
      ],
   ],
   declarations: [
      PageTitleComponent, DefaultLayoutComponent,
      LogoutDirective,
      ...pipes
   ],
   exports: [
      PageTitleComponent, DefaultLayoutComponent,
      LogoutDirective,
      ...pipes
   ],
   providers: [ModulePreloadingStrategy, AuthGuard, AdminGuard]
})
export class SharedModule {
   constructor(injector: Injector) {
      ServiceLocator.injector = injector;
   }
}