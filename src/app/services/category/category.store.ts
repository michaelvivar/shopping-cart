import { Injectable } from "@angular/core";
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot } from "angularfire2/firestore";
import { Category } from "~/services/models/category.model";

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