import { Injectable } from "@angular/core";
import { Category } from "~/services/models/category.model";

@Injectable()
export class CategoryService {
   getAllActive(): Promise<Category[]> {
      return null;
   }

   get(id: any): Promise<Category> {
      return null;
   }

   update(category: Category): Promise<void> {
      return null;
   }
}