import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Main } from '~shared/components/main/main.component';
import { AlertDialog } from '~shared/components/alert-dialog/alert-dialog.component';
import { ConfirmDialog } from '~shared/components/confirm-dialog/confirm-dialog.component';
import { LoginFormComponent } from '~shared/components/login-form/login-form.component';
import { LogoutDirective } from '~shared/directives/logout.directive';
import { AuthGuard } from '~shared/guards/auth.guard';
import { AdminGuard } from '~shared/guards/admin.guard';
import {
   MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule
} from '@angular/material';
const materials = [
   MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule
];

import { SortPipe } from '~shared/pipes/sort.pipe';
const pipes = [
   SortPipe
];

@NgModule({
   imports: [
      CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
      ...materials
   ],
   exports: [...pipes, Main, AlertDialog, ConfirmDialog, LoginFormComponent, LogoutDirective],
   declarations: [...pipes, Main, AlertDialog, ConfirmDialog, LogoutDirective, LoginFormComponent],
   //providers: [AuthGuard, AdminGuard],
   entryComponents: [AlertDialog, ConfirmDialog]
})
export class SharedModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: SharedModule,
         providers: [AuthGuard, AdminGuard, ...pipes]
      }
   }
}