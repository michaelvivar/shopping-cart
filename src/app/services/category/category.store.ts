import { Injectable } from "@angular/core";
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot } from "angularfire2/firestore";
import { Category } from "~/services/models/category.model";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryStore {
   constructor(private firestore: AngularFirestore) { }

   private categories(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('categories', fn);
   }

   private map(doc: firebase.firestore.QueryDocumentSnapshot) {
      const category = doc.data() as Category;
      category.id = doc.id;
      return category;
   }

   private getAllActiveAsync() {
      return this.categories().ref.where('status', '==', true).get().then(data => {
         return data.docs.map(item => this.map(item));
      })
   }

   allAsync(filterActive = true) {
      if (filterActive) {
         return this.getAllActiveAsync();
      }
      else {
         return this.categories().ref.get().then(data => {
            return data.docs.map(item => this.map(item))
         })
      }
   }

   all(filterActive = true): Observable<Category[]> {
      const query: (ref: CollectionReference) => Query = filterActive ? ref => ref.where('status', '==', true) : null;
      return this.categories(query).snapshotChanges()
         .pipe(map(docs => {
            return docs.map(doc => {
               const category = doc.payload.doc.data() as Category;
               category.id = doc.payload.doc.id;
               return category;
            })
         }))
   }

   get(id: any) {
      return this.categories().doc(id).ref.get().then(doc => this.map(doc));
   }

   insert(category: Category): Promise<string> {
      return this.categories().add(category).then(ref => ref.id);
   }

   update(id: any, category: Category | { status: boolean }): Promise<void> {
      return this.categories().doc(id).update(category);
   }
}