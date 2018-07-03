import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule, DefaultLayoutComponent } from '~/shared';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';
import {
   SignupFormModule, SignupFormComponent, LoginFormComponent, LoginFormModule,
   NavListModule, NavListComponent
} from '~/components';
import { UserSideNavsResolver } from '~/services/resolvers/user.resolver';

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      RouterModule.forChild([
         {
            path: '', component: DefaultLayoutComponent, children: [
               { path: 'login', component: LoginFormComponent },
               { path: 'signup', component: SignupFormComponent },
               { path: '', component: NavListComponent, resolve: { navs: UserSideNavsResolver } }
            ]
         }
      ]),
      ...[
         MatListModule, MatDividerModule, MatIconModule, MatButtonModule
      ],
      SharedModule, SignupFormModule, LoginFormModule, NavListModule
   ],
   exports: [],
   declarations: [],
   providers: [
      { provide: 'TITLE', useValue: 'Account' }
   ]
})
export class AccountModule { }