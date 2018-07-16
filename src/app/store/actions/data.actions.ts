import { Product, Item } from "~/services/models/product.model";
import { Category } from "~/services/models/category.model";

export class ProductData {
   static readonly type = '[PRODUCT] Set';

   constructor(public payload: Product) { }
}

export class CategoriesData {
   static readonly type = '[CATEGORIES] Set';

   constructor(public payload: Category[]) { }
}