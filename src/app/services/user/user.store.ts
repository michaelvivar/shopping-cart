import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppUser } from '~/store/actions/app.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseUserService } from '~/services/user/base-user.service';
import { User } from '~/services/models/user.model';
import { AngularFirestore, CollectionReference, Query } from 'angularfire2/firestore';

@Injectable()
export class UserStore extends BaseUserService {

   @Select(store => store.app.user) user$: Observable<any>;

   constructor(
      private store: Store,
      private firestore: AngularFirestore
   ) { super() }

   private users(fn?: (ref: CollectionReference) => Query) {
      return this.firestore.collection('users', fn);
   }

   private filterActive(filter = true): (ref: CollectionReference) => Query {
      return filter ? ref => ref.where('status', '==', true) : undefined;
   }

   private map(doc: firebase.firestore.QueryDocumentSnapshot) {
      const user = doc.data() as User;
      user.id = doc.id;
      return user;
   }

   get(id: any) {
      return { id, service: 'Store' };
   }

   signIn(username: string, password: string) {
      return this.login(username, password);
   }

   login(username: string, password: string) {
      this.store.dispatch(new AppUser({ username: username, type: username == 'admin' ? 'admin' : 'user' }));
      const promise = new Promise(resolve => {
         return resolve(true);
      })
      return promise;
   }

   all(filterActive = true): Observable<User[]> {
      return this.users().snapshotChanges().pipe(map(docs => docs.map(doc => this.map(doc.payload.doc))));
   }

   insert(user: User): Promise<any> {
      return this.users().add(user).then(ref => ref.id);
   }

   update(id: any, user: User | { status: boolean }): Promise<void> {
      return this.users().doc(id).update(user);
   }
}