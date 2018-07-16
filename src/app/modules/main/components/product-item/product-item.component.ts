import { Component } from '@angular/core';
import { Item, Product } from '~/services/models/product.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseComponent } from '~/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
   selector: 'product-item',
   templateUrl: './product-item.template.html'
})
export class ProductItemComponent extends BaseComponent {

   constructor(
      private route: ActivatedRoute,
      private router: Router
   ) { super() }

   @Select(store => store.data.product) product$: Observable<Product>;
   product: Product;
   item: Item;
   image: string;

   ngOnInit() {
      this.subscription = this.product$.pipe(switchMap(product => {
         this.product = product;
         return this.route.paramMap.pipe(map(param => {
            return product.items.find(o => o.id == param.get('item'));
         }))
      })).subscribe(data => {
         this.item = data;
         if (data.pictures.length > 0) {
            this.image = data.pictures[0].url;
         }
      })
   }

   images() {
      if (this.item.pictures.length > 1) {
         this.router.navigate(['/product/images', this.product.id, this.item.id]);
      }
   }
}