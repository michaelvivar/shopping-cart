import { Injectable } from '@angular/core';
import { Option } from '~/services/models/option.model';
import { AngularFirestore, CollectionReference, Query } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsStore {

   constructor(private firestore: AngularFirestore) { }

   private colors(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('colors', fn);
   }

   private sizes(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('sizes', fn);
   }

   private filterActive(filter = true): (ref: CollectionReference) => Query {
      return filter ? ref => ref.where('status', '==', true) : undefined;
   }

   private map(doc: firebase.firestore.QueryDocumentSnapshot) {
      const option = doc.data() as Option;
      option.id = doc.id;
      return option;
   }

   allColors(filterActive = true): Observable<Option[]> {
      return this.colors(this.filterActive(filterActive)).snapshotChanges()
         .pipe(map(docs => docs.map(doc => this.map(doc.payload.doc))));
   }

   getColorAsync(id: any): Promise<Option> {
      return this.colors().doc(id).ref.get().then(doc => this.map(doc));
   }

   insertColor(color: Option): Promise<string> {
      return this.colors().add(color).then(ref => ref.id);
   }

   updateColor(id: any, color: Option | { status: boolean }): Promise<void> {
      return this.colors().doc(id).update(color);
   }

   allSizes(filterActive = true): Observable<Option[]> {
      return this.sizes(this.filterActive(filterActive)).snapshotChanges()
         .pipe(map(docs => docs.map(doc => this.map(doc.payload.doc))));
   }

   getSizeAsync(id: any): Promise<Option> {
      return this.sizes().doc(id).ref.get().then(doc => this.map(doc));
   }

   insertSize(color: Option): Promise<string> {
      return this.sizes().add(color).then(ref => ref.id);
   }

   updateSize(id: any, color: Option | { status: boolean }): Promise<void> {
      return this.sizes().doc(id).update(color);
   }
}