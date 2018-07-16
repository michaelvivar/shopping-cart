import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '~/services/models/product.model';
import { ProductService } from '~/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '~/shared';
import { PageTitle } from '~/store/actions/page.actions';
import { ProductData } from '~/store/actions/data.actions';

@Component({
   templateUrl: './product-page.template.html'
})
export class ProductPage extends Page {

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: ProductService
   ) { super() }

   @Select(store => store.data.product) product$: Observable<Product>;
   product: Product;

   ngOnInit() {
      this.product$.subscribe(data => {
         if (!data) {
            this.router.navigate(['/']);
         }
         else {
            this.product = data;
            this.store.dispatch(new PageTitle(this.product.name));
         }
      }).unsubscribe();
   }
}