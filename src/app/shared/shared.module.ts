import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Main } from './components/main/main.component';
import { AlertDialog } from './components/alert-dialog/alert-dialog.component';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';
import { LoginDialog } from './components/login-dialog/login-dialog.component';
import { LogoutDirective } from './directives/logout.directive';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

import {
  MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule
} from '@angular/material';
const materials = [
  MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule
];

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    ...materials
  ],
  exports: [Main, AlertDialog, ConfirmDialog, LoginFormComponent, LogoutDirective],
  declarations: [Main, AlertDialog, ConfirmDialog, LoginDialog, LogoutDirective, LoginFormComponent],
  providers: [AuthGuard, AdminGuard],
  entryComponents: [AlertDialog, ConfirmDialog, LoginDialog]
})
export class SharedModule {
  forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthGuard, AdminGuard]
    }
  }
}