import { Component } from "@angular/core";
import { Page } from "~/shared";
import { PageTitle } from "~/store/actions/page.actions";

@Component({
   template: 'My Cart'
})
export class CartPage extends Page {

   ngOnInit() {
      this.store.dispatch(new PageTitle('My Cart'));
   }
}