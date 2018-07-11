import { Injectable } from "@angular/core";
import { Category } from "~/services/models/category.model";

@Injectable()
export class CategoryService {
   getAllActive(): Promise<Category[]> {
      return null;
   }
}