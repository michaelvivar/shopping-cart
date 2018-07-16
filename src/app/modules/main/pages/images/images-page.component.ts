import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, Item } from '~/services/models/product.model';
import { Page } from '~/shared';
import { switchMap, map } from '../../../../../../node_modules/rxjs/operators';
import { BackButton, PageTitle } from '~/store/actions/page.actions';

@Component({
   templateUrl: './images-page.template.html'
})
export class ImagesPage extends Page {

   constructor(
      private route: ActivatedRoute,
      private router: Router
   ) { super() }

   @Select(store => store.data.product) product$: Observable<Product>;

   product: Product;
   item: Item;
   images: string[] = [];

   ngOnInit() {
      this.subscription = this.product$.pipe(switchMap(product => {
         return this.route.paramMap.pipe(map(param => {
            if (product && product.items && product.items.length > 0) {
               const item = product.items.find(o => o.id == param.get('item'));
               this.item = item;
               if (item && item.pictures && item.pictures.length > 0) {
                  return {
                     images: item.pictures.map(o => o.url),
                     product, item
                  }
               }
            }
            return { product: <any>param.get('id'), item: <any>param.get('item') };
         }))
      })).subscribe(data => {
         if (data.images && data.images.length > 0) {
            this.images = data.images;
            this.item = data.item;
            this.product = data.product;
            this.store.dispatch(new PageTitle(this.product.name));
            this.store.dispatch(new BackButton({ link: '/product/' + this.product.id + '/' + this.item.id }));
         }
         else {
            this.router.navigate(['/product', data.product, data.item]);
         }
      })
   }
}