import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppUser } from '~/store/actions/app.actions';

@Injectable()
export class UserService {

   constructor(private store: Store) { }

   get(id: any) {
      return { id, service: 'Service' };
   }

   login(username: string, password: string) {
      this.store.dispatch(new AppUser({ username: username, type: 'admin' }));
      const promise = new Promise(resolve => {
         return resolve(true);
      })
      return promise;
   }

   sideNavs() {

   }
}