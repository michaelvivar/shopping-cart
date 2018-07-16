import { NgModule } from '@angular/core';
import { SharedModule } from '~/shared';
import { RouterModule } from '@angular/router';
import { UserNavsResolver } from '~/services/resolvers/user.resolver';
import { LoginPage } from './pages/login/login-page.component';
import { SignupPage } from './pages/signup/signup-page.component'; import { MainPage } from './pages/main/main-page.component';
;

@NgModule({
   imports: [
      RouterModule.forChild([
         { path: 'login', component: LoginPage },
         { path: 'signup', component: SignupPage },
         { path: '', component: MainPage, resolve: { navs: UserNavsResolver } }
      ]),
      SharedModule
   ],
   exports: [],
   declarations: [
      LoginPage, SignupPage, MainPage
   ],
   providers: [
      { provide: 'TITLE', useValue: 'Account' }
   ]
})
export class AccountModule { }