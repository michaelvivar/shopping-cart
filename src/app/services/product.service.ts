import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
   get(id: any) {
      return 'product from service';
   }
}