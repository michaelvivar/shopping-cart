import { Injectable } from '@angular/core';
import { Product, Item, Review } from '~/services/models/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

   all(filterActive = true): Observable<Product[]> {
      return null;
   }

   getAsync(id: any): Promise<Product> {
      return null;
   }

   get(id: any): Observable<Product> {
      return null;
   }

   getWithItems(id: any): Observable<Product> {
      return null;
   }

   getWithItem(id: any, itemId: any): Observable<Product> {
      return null;
   }

   getRatings(id: any): Observable<number[]> {
      return null;
   }

   getReviews(id: any, limit?: number): Observable<Review[]> {
      return null;
   }

   insert(product: Product): Promise<string> {
      return null;
   }

   update(id: any, product: Product | { status: boolean }): Promise<void> {
      return null;
   }

   allItems(id: any, filterActive = true): Observable<Item[]> {
      return null;
   }

   insertItem(productId, item: Item): Promise<string> {
      return null;
   }

   updateItem(productId: any, id: any, item: Item | { status: boolean }): Promise<void> {
      return null;
   }

   addImage(productId: any, itemId: any, id: string, url: string): Promise<string> {
      return null;
   }

   deleteImage(productId: any, itemId: any, id: string): Promise<void> {
      return null;
   }

   allImages(productId: any, itemId: any): Observable<any> {
      return null;
   }
}