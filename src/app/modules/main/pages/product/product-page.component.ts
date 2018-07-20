import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '~/services/models/product.model';
import { ProductService } from '~/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '~/shared';

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
      this.product$.subscribe(product => {
         this.product = product;
         this.title = product.name;
      }).unsubscribe();
   }
}