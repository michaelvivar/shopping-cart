import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '~/shared';
import { Category } from '~/services/models/category.model';

@Component({
   templateUrl: './category-details.template.html'
})
export class CategoryDetailsPage extends Page {

   constructor(private route: ActivatedRoute) { super() }

   category: Category;

   ngOnInit() {
      this.category = this.route.snapshot.data['category'];
   }
}