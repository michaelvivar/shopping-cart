import { Injectable } from '@angular/core';
import { ProductService } from '~/services/product/product.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Product } from '~/services/models/product.model';
import { take, tap, switchMap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
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

      return this.product$.pipe(switchMap(value => {
         if (value && value.id == id) {
            return of(value);
         }
         else {
            return this.service.getWithItems(id).
               pipe(tap(product => this.store.dispatch(new ProductData(product))))
         }
      }))
         .pipe(take(1))
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