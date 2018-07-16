import { Component, OnInit, Input } from '@angular/core';
import { Product, Item } from '~/services/models/product.model';
import { ProductService } from '~/services/product/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BaseComponent } from '~/shared';
import { ProductData } from '~/store/actions/data.actions';
import { tap } from '../../../../../../node_modules/rxjs/operators';

@Component({
   selector: 'product',
   templateUrl: './product.template.html',
   styles: []
})
export class ProductComponent extends BaseComponent {

   constructor(
      private router: Router,
      private service: ProductService
   ) { super() }

   @Input('data') product: Product;
   item$: Observable<Item[]>;

   ngOnInit() {
      if (this.product) {
         this.item$ = this.service.allItems(this.product.id)
            .pipe(tap(values => {
               this.product.items = values;
            }))
      }
   }

   details() {
      this.store.dispatch(new ProductData(this.product));
      this.router.navigate(['/product', this.product.id, this.product.items[0].id]);
   }
}
