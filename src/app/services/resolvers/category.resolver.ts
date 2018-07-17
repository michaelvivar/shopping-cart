import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CategoryService } from "~/services/category/category.service";
import { Category } from "~/services/models/category.model";
import { take } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class CategoriesResolver {
   constructor(private service: CategoryService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.all((filterActive == true) ? true : false).pipe(take(1));
   }
}

@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<Category> {

   constructor(private service: CategoryService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      return this.service.getAsync(id);
   }
}