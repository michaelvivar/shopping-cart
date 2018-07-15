import { Injectable } from '@angular/core';
import { Product, Item } from '~/services/models/product.model';
import { AngularFirestore, CollectionReference, Query } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProductStore {
   constructor(private firestore: AngularFirestore) { }

   private products(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('products', fn);
   }

   private map(doc: firebase.firestore.QueryDocumentSnapshot) {
      const product = doc.data() as Product;
      //product.detailsList = product.details.split(new RegExp('\r?\n','g'));
      product.id = doc.id;
      return product;
   }

   private getAllActiveAsync(): Promise<Product[]> {
      return this.products().ref.where('status', '==', true).get().then(data => {
         return data.docs.map(doc => {
            const product = this.map(doc);
            doc.ref.collection('items').get().then(items => {
               product.items = <any>items.docs.map(item => item.id);
            })
            return product;
         });
      })
   }

   allAsync(filterActive = true): Promise<Product[]> {
      if (filterActive) {
         return this.getAllActiveAsync();
      }
      else {
         return this.products().ref.get().then(async (data) => {
            // return data.docs.map(doc => this.map(doc));
            return data.docs.map(doc => {
               const product = this.map(doc);
               doc.ref.collection('items').get().then(items => {
                  product.items = <any>items.docs.map(item => item.id);
               })
               return product;
            });
         })
      }
   }

   getAsync(id: any) {
      return this.products().doc(id).ref.get().then(doc => this.map(doc));
   }

   getWithItemsAsync(id: any): Promise<Product> {
      return this.products().doc(id).ref.get().then(async (doc) => {
         const product = this.map(doc);
         product.items = [];
         await doc.ref.collection('items').get().then(items => {
            items.docs.forEach(item => {
               const data = item.data() as Item;
               data.id = item.id;
               product.items.push(data);
            })
         })
         return product;
      })
   }

   getWithItemAsync(id: any, itemId: any): Promise<Product> {
      return this.products().doc(id).ref.get().then(async (doc) => {
         const product = this.map(doc);
         product.items = [];
         await doc.ref.collection('items').doc(itemId).get().then(item => {
            const data = item.data() as Item;
            data.id = item.id;
            product.items.push(data);
         })
         return product;
      })
   }

   insert(product: Product): Promise<string> {
      return this.products().add(product).then(ref => ref.id);
   }

   update(id: any, product: Product | { status: boolean }): Promise<void> {
      return this.products().doc(id).update(product);
   }

   allItems(id: any) {
      return this.products().doc(id).collection('items').snapshotChanges()
         .pipe(map(docs => {
            return docs.map(doc => {
               const item = doc.payload.doc.data() as Item;
               item.id = doc.payload.doc.id;
               return item;
            })
         }))
   }

   insertItem(productId, item: Item): Promise<string> {
      return this.products().doc(productId).collection('items').add(item).then(ref => ref.id);
   }

   updateItem(productId: any, id: any, item: Item | { status: boolean }): Promise<void> {
      return this.products().doc(productId).collection('items').doc(id).update(item);
   }

   addImage(productId: any, itemId: any, id: string, url: string) {
      this.products().doc(productId).collection('items').doc(itemId).collection('images').doc(id).set({
         url: url
      })
   }

   deleteImage(productId: any, itemId: any, id: string): Promise<void> {
      return this.products().doc(productId).collection('items').doc(itemId).collection('images').doc(id).delete();
   }

   allImages(productId: any, itemId: any): Observable<any> {
      return this.products().doc(productId).collection('items').doc(itemId).collection('images').snapshotChanges()
         .pipe(map(docs => {
            return docs.map(doc => {
               const image = doc.payload.doc.data() as { url: string, id: string };
               image.id = doc.payload.doc.id;
               return image;
            })
         }))
   }
}