import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '~/services/models/product.model';
import { BaseComponent } from '~/shared';

@Component({
   selector: 'product-details',
   templateUrl: './product-details.template.html'
})
export class ProductDetailsComponent extends BaseComponent {

   constructor() { super() }

   list: string[] = [];
   @Select(store => store.data.product) product$: Observable<Product>;

   ngOnInit() {
      this.subscription = this.product$.subscribe(data => {
         const details = data.details || '';
         this.list = details.split(new RegExp('\r?\n', 'g'));
      })
   }
}