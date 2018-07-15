import { Injectable } from '@angular/core';
import { ProductService } from '~/services/product/product.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Product } from '~/services/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsResolver {

   constructor(private service: ProductService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.allAsync((filterActive == true) ? true : false);
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

   constructor(private service: ProductService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      return this.service.getWithItemsAsync(id);
   }
}

@Injectable({ providedIn: 'root' })
export class ProductWithItemResolver implements Resolve<Product> {

   constructor(private service: ProductService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      const itemId = route.paramMap.get('itemId');
      return this.service.getWithItemAsync(id, itemId);
   }
}