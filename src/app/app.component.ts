import { Component, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoryService } from '~/services/category/category.service';
import { CategoriesData } from '~/store/actions/data.actions';
import { ProductService } from '~/services/product/product.service';
import { createCustomElement } from '@angular/elements';
import { TestElementComponent } from './elements/test-element.component';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(
      private store: Store,
      private categoryService: CategoryService,
      private productService: ProductService,
      private injector: Injector
   ) {
   }

   ngOnInit() {
      this.categoryService.all().subscribe(data => {
         this.store.dispatch(new CategoriesData(data));
      }).unsubscribe();

      // const ele = createCustomElement(TestElementComponent, { injector: this.injector });
      // customElements.define('app-test', ele);
   }

   progress: number = 0;
}