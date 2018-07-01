import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { Main } from './../../shared/components/main/main.component';
import { AccountNavListPage } from './pages/account-navlist/account-navlist-page.component';

import { MatIconModule, MatButtonModule, MatListModule } from '@angular/material';

const materials = [MatIconModule, MatButtonModule, MatListModule];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: Main, children: [
          { path: '**', component: AccountNavListPage }
        ]
      }
    ]),
    SharedModule,
    ...materials
  ],
  declarations: [AccountNavListPage],
  providers: []
})
export class AccountModule { }