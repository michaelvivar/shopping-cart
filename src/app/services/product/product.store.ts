import { Injectable } from '@angular/core';
import { Product, Item, Picture, Review } from '~/services/models/product.model';
import { AngularFirestore, CollectionReference, Query, DocumentSnapshot, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map, switchMap, reduce } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Injectable()
export class ProductStore {
   constructor(private firestore: AngularFirestore) { }

   private products(fn?: (ref: CollectionReference) => Query): AngularFirestoreCollection<Product> {
      return this.firestore.collection('products', fn);
   }

   private reviews(fn?: (ref: CollectionReference) => Query): AngularFirestoreCollection<Review> {
      return this.firestore.collection('reviews', fn);
   }

   private filterActive(filter = true): (ref: CollectionReference) => Query {
      return filter ? ref => ref.where('status', '==', true) : undefined;
   }

   private map<T>(doc: firebase.firestore.QueryDocumentSnapshot | DocumentSnapshot<T>) {
      const data = doc.data() as T;
      data['id'] = doc.id;
      return data;
   }

   all(filterActive = true): Observable<Product[]> {
      return this.products(this.filterActive(filterActive)).snapshotChanges()
         .pipe(map(docs => docs.map(doc => this.map<Product>(doc.payload.doc))));
   }

   getAsync(id: any) {
      return this.products().doc(id).ref.get().then(doc => this.map(doc));
   }

   get(id: any): Observable<Product> {
      return this.products().doc(id).snapshotChanges().pipe(map(doc => this.map<Product>(doc.payload)));
   }

   getWithItems(id: any) {
      return this.products().doc(id).snapshotChanges().pipe(map(doc => this.map<Product>(doc.payload)))
         .pipe(switchMap(value => {
            return this.allItems(id).pipe(map(items => {
               value.items = items;
               return value;
            }))
         }))
   }

   getWithItem(id: any, itemId: any): Observable<Product> {
      return this.get(id).pipe(switchMap(product => this.getItem(id, itemId)
         .pipe(map(item => {
            product.items = [item];
            return product;
         }))));
   }

   getRatings(id: any): Observable<number[]> {
      return this.reviews(q => q.where('product', '==', id)).snapshotChanges()
         .pipe(map(docs => docs.map(doc => doc.payload.doc.get('rate'))));
   }

   getReviews(id: any, limit?: number): Observable<Review[]> {
      return this.reviews(q => limit ? q.where('product', '==', id).limit(limit) : q.where('product', '==', id))
         .snapshotChanges()
         .pipe(map(docs => {
            return docs.map(doc => {
               const review = doc.payload.doc.data();
               review.date = <any>(review.date['seconds'] * 1000);
               return review;
            })
         }))
         .pipe(switchMap(reviews => combineLatest(reviews.map(review => {
            return this.firestore.collection('users').doc(review.user).snapshotChanges().pipe(map(doc => {
               review.user = doc.payload.data();
               review.user.id = doc.payload.id;
               return review;
            }))
         }))))
   }

   insert(product: Product): Promise<string> {
      return this.products().add(product).then(ref => ref.id);
   }

   update(id: any, product: Product | { status: boolean }): Promise<void> {
      return this.products().doc(id).update(product);
   }

   allItems(id: any, filterActive = true) {
      return this.products().doc(id).collection('items', this.filterActive(filterActive)).snapshotChanges()
         .pipe(map(docs => docs.length > 0 ? docs.map(doc => this.map<Item>(doc.payload.doc)) : []))
         .pipe(switchMap(values => combineLatest(values.map(value => {
            return this.allImages(id, value.id)
               .pipe(map(images => {
                  value.pictures = images;
                  return value;
               }))
         }))))
   }

   getItem(id: any, itemId: any): Observable<Item> {
      return this.products().doc(id).collection('items').doc(itemId).snapshotChanges()
         .pipe(map(doc => this.map<Item>(doc.payload)));
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
         .pipe(map(docs => docs.length > 0 ? docs.map(doc => this.map<Picture>(doc.payload.doc)) : []))
   }
}