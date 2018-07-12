import { Component } from "@angular/core";
import { Page } from "~/shared";
import { PageTitle } from "~/store/actions/page.actions";

@Component({
   template: '<div class="page"><signup-form></signup-form></div>'
})
export class SignupPage extends Page {

   ngOnInit() {
      this.store.dispatch(new PageTitle('Sign Up'));

   }
}