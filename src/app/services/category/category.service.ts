import { Injectable } from "@angular/core";
import { Category } from "~/services/models/category.model";
import { Observable } from "rxjs";

@Injectable()
export class CategoryService {
   all(filterActive = true): Observable<Category[]> {
      return null;
   }

   getAsync(id: any): Promise<Category> {
      return null;
   }

   insert(category: Category): Promise<string> {
      return null;
   }

   update(id: any, category: Category | { status: boolean }): Promise<void> {
      return null;
   }
}