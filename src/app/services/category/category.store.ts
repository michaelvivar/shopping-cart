import { Injectable } from "@angular/core";
import { AngularFirestore, CollectionReference, Query } from "angularfire2/firestore";
import { Category } from "~/services/models/category.model";

@Injectable()
export class CategoryStore {
   constructor(private firestore: AngularFirestore) { }

   categories(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('categories', fn);
   }

   getAllActive() {
      return this.categories().ref.get().then(data => {
         return data.docs.map(item => {
            const category = item.data() as Category;
            category.id = item.id;
            return category;
         })
      })
   }

   get(id: any) {
      return this.categories().doc(id).ref.get().then(doc => {
         const category = doc.data() as Category;
         category.id = id;
         return category;
      })
   }

   update(category: Category): Promise<void> {
      return this.categories().doc(category.id).update(category);
   }
}