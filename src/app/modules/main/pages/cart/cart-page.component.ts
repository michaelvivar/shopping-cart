import { Component } from "@angular/core";
import { Page } from "~/shared";

@Component({
   template: 'My Cart'
})
export class CartPage extends Page {

   ngOnInit() {
      this.title = 'My Cart';
   }
}