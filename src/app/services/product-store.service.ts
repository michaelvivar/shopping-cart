import { Injectable } from "@angular/core";

@Injectable()
export class ProductStore {
  get(id: any) {
    return 'product from store';
  }
}