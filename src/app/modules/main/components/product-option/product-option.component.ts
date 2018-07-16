import { Component } from '@angular/core';
import { Item, Product } from '~/services/models/product.model';
import { BaseComponent } from '~/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
   selector: 'product-option',
   templateUrl: './product-option.template.html'
})
export class ProductOptionComponent extends BaseComponent {

   constructor(private route: ActivatedRoute) { super() }

   @Select(store => store.data.product) product$: Observable<Product>;
   items: Item[];
   id: any;

   ngOnInit() {
      this.subscription = this.product$.pipe(switchMap(product => {
         this.id = product.id;
         return this.route.paramMap.pipe(map(param => {
            return product.items.filter(o => o.id != param.get('item'));
         }))
      })).subscribe(data => {
         this.items = data;
      })
   }
}