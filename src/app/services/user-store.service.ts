import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetAppUser } from '~store/actions/app.actions';

@Injectable()
export class UserStore {

   constructor(private store: Store) { }

   login(username: string, password: string) {
      this.store.dispatch(new SetAppUser({ username: username, type: 'admin' }));
      const promise = new Promise(resolve => {
         return resolve(true);
      })
      return promise;
   }
}