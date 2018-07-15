import { Injectable } from "@angular/core";
import { Category } from "~/services/models/category.model";

@Injectable()
export class CategoryService {
   allAsync(filterActive = true): Promise<Category[]> {
      return null;
   }

   get(id: any): Promise<Category> {
      return null;
   }

   insert(category: Category): Promise<string> {
      return null;
   }

   update(id: any, category: Category | { status: boolean }): Promise<void> {
      return null;
   }
}