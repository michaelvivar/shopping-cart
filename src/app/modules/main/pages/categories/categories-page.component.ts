import { Page } from "~/shared";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Category } from "~/services/models/category.model";
import { PageTitle } from "~/store/actions/page.actions";

@Component({
   templateUrl: './categories-page.template.html'
})
export class CategoriesPage extends Page {

   constructor(private route: ActivatedRoute) { super() }

   categories: Category[] = [];

   ngOnInit() {
      this.store.dispatch(new PageTitle('Categories'));
      this.categories = this.route.snapshot.data['categories'];
   }
}