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

   private filterActive(filter = true): (ref: CollectionReference) => Query {
      return filter ? ref => ref.where('status', '==', true) : undefined;
   }

   private map(doc: firebase.firestore.QueryDocumentSnapshot) {
      const category = doc.data() as Category;
      category.id = doc.id;
      return category;
   }

   get(id: any): Observable<Category> {
      return this.categories().doc(id).snapshotChanges()
         .pipe(map(doc => this.map(doc.payload)));
   }

   all(filterActive = true): Observable<Category[]> {
      return this.categories(this.filterActive(filterActive)).snapshotChanges()
         .pipe(map(docs => docs.map(doc => this.map(doc.payload.doc))))
   }

   getAsync(id: any) {
      return this.categories().doc(id).ref.get().then(doc => this.map(doc));
   }

   insert(category: Category): Promise<string> {
      return this.categories().add(category).then(ref => ref.id);
   }

   update(id: any, category: Category | { status: boolean }): Promise<void> {
      return this.categories().doc(id).update(category);
   }
}