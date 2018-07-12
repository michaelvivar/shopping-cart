import { Component } from '@angular/core';
import { Page } from '~/shared';
import { PageTitle } from '~/store/actions/page.actions';

@Component({
   templateUrl: './login-page.template.html'
})
export class LoginPage extends Page {
   ngOnInit() {
      this.store.dispatch(new PageTitle('Log In'));
   }
}