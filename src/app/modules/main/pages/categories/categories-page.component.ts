import { Page } from "~/shared";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Category } from "~/services/models/category.model";

@Component({
   templateUrl: './categories-page.template.html'
})
export class CategoriesPage extends Page {

   constructor(private route: ActivatedRoute) { super() }

   categories: Category[] = [];

   ngOnInit() {
      this.title = 'Categories';
      this.categories = this.route.snapshot.data['categories'];
   }
}