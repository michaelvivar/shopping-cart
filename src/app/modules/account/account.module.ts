import { NgModule } from '@angular/core';
import { SharedModule, DefaultLayout } from '~/shared';
import { RouterModule } from '@angular/router';
import { NavListModule, NavListComponent } from '~/components';
import { UserNavsResolver } from '~/services/resolvers/user.resolver';
import { LoginPage } from './pages/login/login-page.component';
import { SignupPage } from './pages/signup/signup-page.component';

@NgModule({
   imports: [
      RouterModule.forChild([
         { path: 'login', component: LoginPage },
         { path: 'signup', component: SignupPage },
         { path: '', component: NavListComponent, resolve: { navs: UserNavsResolver } }
      ]),
      SharedModule, NavListModule
   ],
   exports: [],
   declarations: [
      LoginPage, SignupPage
   ],
   providers: [
      { provide: 'TITLE', useValue: 'Account' }
   ]
})
export class AccountModule { }