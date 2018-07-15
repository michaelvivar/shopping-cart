import { Injectable } from '@angular/core';
import { Option } from '~/services/models/option.model';
import { AngularFirestore, CollectionReference, Query } from 'angularfire2/firestore';

@Injectable()
export class SettingsStore {

   constructor(private firestore: AngularFirestore) { }

   private colors(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('colors', fn);
   }

   private sizes(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('sizes', fn);
   }

   private map(doc: firebase.firestore.QueryDocumentSnapshot) {
      const option = doc.data() as Option;
      option.id = doc.id;
      return option;
   }

   allColorsAsync(filterActive = true): Promise<Option[]> {
      const ref = this.colors().ref;
      if (filterActive) {
         return ref.where('status', '==', true).get().then(data => {
            return data.docs.map(doc => this.map(doc));
         });
      }
      else {
         return ref.get().then(data => {
            return data.docs.map(doc => this.map(doc));
         });
      }
   }

   getColor(id: any): Promise<Option> {
      return this.colors().doc(id).ref.get().then(doc => this.map(doc));
   }

   insertColor(color: Option): Promise<string> {
      return this.colors().add(color).then(ref => ref.id);
   }

   updateColor(id: any, color: Option | { status: boolean }): Promise<void> {
      return this.colors().doc(id).update(color);
   }

   allSizesAsync(filterActive = true): Promise<Option[]> {
      const ref = this.sizes().ref;
      if (filterActive) {
         return ref.where('status', '==', true).get().then(data => {
            return data.docs.map(doc => this.map(doc));
         });
      }
      else {
         return ref.get().then(data => {
            return data.docs.map(doc => this.map(doc));
         });
      }
   }

   getSize(id: any): Promise<Option> {
      return this.sizes().doc(id).ref.get().then(doc => this.map(doc));
   }

   insertSize(color: Option): Promise<string> {
      return this.sizes().add(color).then(ref => ref.id);
   }

   updateSize(id: any, color: Option | { status: boolean }): Promise<void> {
      return this.sizes().doc(id).update(color);
   }
}