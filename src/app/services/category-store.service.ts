import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Category } from "~models/category.model";
import { map } from "rxjs/operators";

@Injectable()
export class CategoryStore {

   constructor(private firestore: AngularFirestore) { }

   private get categories() {
      return this.firestore.collection('categories');
   }

   getAll() {
      return this.categories.snapshotChanges().pipe(map(data => {
         return data.map(doc => {
            const category = doc.payload.doc.data() as Category;
            category.id = doc.payload.doc.id;
            return category;
         })
      }))
   }
}