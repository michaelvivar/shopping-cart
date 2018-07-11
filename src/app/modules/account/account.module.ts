import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule, DefaultLayoutComponent } from '~/shared';
import { RouterModule } from '@angular/router';
import {
   SignupFormComponent, LoginFormComponent,
   NavListModule, NavListComponent
} from '~/components';
import { UserNavsResolver } from '~/services/resolvers/user.resolver';
import { UserStore } from '~/services/user/user.store';

@NgModule({
   imports: [
      RouterModule.forChild([
         {
            path: '', component: DefaultLayoutComponent, children: [
               { path: 'login', component: LoginFormComponent },
               { path: 'signup', component: SignupFormComponent },
               { path: '', component: NavListComponent, resolve: { navs: UserNavsResolver } }
            ]
         }
      ]),
      SharedModule, NavListModule
   ],
   exports: [],
   declarations: [
      LoginFormComponent, SignupFormComponent
   ],
   providers: [
      { provide: 'TITLE', useValue: 'Account' }
   ]
})
export class AccountModule { }