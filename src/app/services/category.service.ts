import { Injectable } from "@angular/core";
import { Category } from "~models/category.model";
import { Observable } from "rxjs";

@Injectable()
export class CategoryService {
   getAll(): Observable<Category[]> {
      return null;
   }
}