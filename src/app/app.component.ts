import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoryService } from '~/services/category/category.service';
import { CategoriesData } from '~/store/actions/data.actions';
import { ProductService } from '~/services/product/product.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(
      private store: Store,
      private categoryService: CategoryService,
      private productService: ProductService
   ) { }

   ngOnInit() {
      this.categoryService.all().subscribe(data => {
         this.store.dispatch(new CategoriesData(data));
      }).unsubscribe();
   }

   progress: number = 0;
}