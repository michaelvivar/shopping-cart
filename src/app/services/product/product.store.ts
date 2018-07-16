import { Injectable } from '@angular/core';
import { Product, Item, Picture } from '~/services/models/product.model';
import { AngularFirestore, CollectionReference, Query } from 'angularfire2/firestore';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, pipe } from 'rxjs';

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

   getWithItemsAndImagesAsync(id: any, itemId: any): Promise<Product> {
      return this.products().doc(id).ref.get().then(doc => {
         const product = this.map(doc);
         product.items = [];
         return doc.ref.collection('items').get().then(items => {
            product.items = <Item[]>items.docs.map(item => ({ id: item.id, ...item.data() }));
            return product.items;
         }).then(async (items) => {
            await items.forEach(async (item) => {
               return await doc.ref.collection('items').doc(item.id).collection('images').get().then(images => {
                  product.items.find(o => o.id == item.id).pictures = <any>images.docs.map(image => image.data());
               });
            })
            return product;
            // return doc.ref.collection('items').doc(itemId).collection('images').get().then(images => {
            //    items.find(o => o.id == itemId).pictures = <any>images.docs.map(image => image.data());
            //    product.items = items;
            //    return product;
            // });
         })
      })
   }

   insert(product: Product): Promise<string> {
      return this.products().add(product).then(ref => ref.id);
   }

   update(id: any, product: Product | { status: boolean }): Promise<void> {
      return this.products().doc(id).update(product);
   }

   all(limit?: number): Observable<Product[]> {
      return this.products(
         ref => {
            if (limit && limit >= 1) {
               return ref.where('status', '==', true).limit(limit);
            }
            else {
               return ref.where('status', '==', true);
            }
         }
      ).snapshotChanges()
         .pipe(map(docs => {
            return docs.map(doc => {
               const product = doc.payload.doc.data() as Product;
               product.id = doc.payload.doc.id;
               return product;
            })
         }))
   }

   allItems(id: any, limit?: number) {
      const query: (ref: CollectionReference) => Query = ref => {
         if (limit && limit >= 1) {
            return ref.where('status', '==', true).limit(limit);
         }
         else {
            return ref.where('status', '==', true);
         }
      };
      return this.products().doc(id).collection('items', query).snapshotChanges()
         .pipe(map(docs => {
            if (docs.length > 0) {
               return docs.map(doc => {
                  const item = doc.payload.doc.data() as Item;
                  item.id = doc.payload.doc.id;
                  return item;
               })
            }
            else {
               return [];
            }
         }))
         .pipe(switchMap(values => combineLatest(values.map(value => {
            return this.allImages(id, value.id)
               .pipe(map(images => {
                  value.pictures = images;
                  return value;
               }))
         }))))
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

   allImages(productId: any, itemId: any): Observable<Picture[]> {
      return this.products().doc(productId).collection('items').doc(itemId).collection('images').snapshotChanges()
         .pipe(map(docs => {
            if (docs.length > 0) {
               return docs.map(doc => {
                  const image = doc.payload.doc.data() as Picture;
                  image.id = doc.payload.doc.id;
                  return image;
               })
            }
            else {
               return [];
            }
         }))
   }
}