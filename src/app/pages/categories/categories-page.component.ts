import { Component } from '@angular/core';
import { CategoryService } from '~services/category.service';
import { Category } from '~models/category.model';
import { Observable } from 'rxjs';

@Component({
   templateUrl: './categories-page.template.html'
})
export class CategoriesPage {
   constructor(private service: CategoryService) { }

   categories$: Observable<Category[]>;

   ngOnInit() {
      this.categories$ = this.service.getAll();
   }
}