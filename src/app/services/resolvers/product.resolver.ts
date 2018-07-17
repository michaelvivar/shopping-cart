import { Injectable } from '@angular/core';
import { ProductService } from '~/services/product/product.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Product } from '~/services/models/product.model';
import { take, tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductData } from '~/store/actions/data.actions';

@Injectable({ providedIn: 'root' })
export class ProductsResolver {

   constructor(private service: ProductService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.all((filterActive == true) ? true : false).pipe(take(1))
   }
}

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Product> {

   constructor(private service: ProductService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      return this.service.getAsync(id);
   }
}

@Injectable({ providedIn: 'root' })
export class ProductWithItemsResolver implements Resolve<Product> {

   constructor(private service: ProductService, private store: Store) { }

   @Select(store => store.data.product) product$: Observable<Product>;

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      let product: Product;
      this.product$.subscribe(data => product = data);
      if (product && product.id == id) {
         return product;
      }
      return this.service.getWithItems(id).pipe(take(1), tap(data => {
         this.store.dispatch(new ProductData(data));
      }))
   }
}

@Injectable({ providedIn: 'root' })
export class ProductWithItemResolver implements Resolve<Product> {

   constructor(private service: ProductService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      const itemId = route.paramMap.get('itemId');
      return this.service.getWithItem(id, itemId).pipe(take(1))
   }
}