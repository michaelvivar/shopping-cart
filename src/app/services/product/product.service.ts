import { Injectable } from '@angular/core';
import { Product, Item } from '~/services/models/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

   allAsync(filterActive = true): Promise<Product[]> {
      return null;
   }

   getAsync(id: any): Promise<Product> {
      return null;
   }

   getWithItemsAsync(id: any): Promise<Product> {
      return null;
   }

   getWithItemAsync(id: any, itemId: any): Promise<Product> {
      return null;
   }

   getWithItemsAndImagesAsync(id: any, itemId: any): Promise<Product> {
      return null;
   }

   insert(product: Product): Promise<string> {
      return null;
   }

   update(id: any, product: Product | { status: boolean }): Promise<void> {
      return null;
   }

   all(limit?: number): Observable<Product[]> {
      return null;
   }

   allItems(id: any, limit?: number): Observable<Item[]> {
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