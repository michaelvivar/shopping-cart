import { Component } from "@angular/core";
import { Page } from "~/shared";
import { PageTitle } from "~/store/actions/page.actions";

@Component({
   template: '<div class="page"><login-form></login-form></div>'
})
export class LoginPage extends Page {

   ngOnInit() {
      this.store.dispatch(new PageTitle('Log In'));
   }
}