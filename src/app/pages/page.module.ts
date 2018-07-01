import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './../shared/guards/auth.guard';
import { Main } from './main/main.component';
import { HomePage } from './home/home-page.component';
import { LoginPage } from './login/login-page.component';
import { CategoriesPage } from './categories/categories-page.component';
import {
  MatToolbarModule, MatIconModule, MatButtonModule,
  MatSidenavModule, MatListModule
} from '@angular/material';

const materials = [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: Main, children: [
          { path: 'categories', component: CategoriesPage },
          { path: 'login', component: LoginPage },
          { path: 'account', loadChildren: './account/account.module#AccountModule', canActivate: [AuthGuard] },
          { path: '**', component: HomePage }
        ]
      }
    ]),
    SharedModule,
    ...materials
  ],
  declarations: [Main, HomePage, CategoriesPage, LoginPage],
  providers: []
})
export class PageModule { }