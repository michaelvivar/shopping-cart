import { Injectable } from "@angular/core";
import { CategoryService } from "~/services/category/category.service";

@Injectable({ providedIn: 'root' })
export class CategoriesResolver {
   constructor(private service: CategoryService) { }

   resolve() {
      return this.service.getAllActive();
   }
}