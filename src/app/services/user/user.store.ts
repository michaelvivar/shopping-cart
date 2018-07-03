import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppUser } from '~/store/actions/app.actions';
import { Observable } from 'rxjs';

@Injectable()
export class UserStore {

   @Select(store => store.app.user) user$: Observable<any>
   user: any;

   constructor(private store: Store) {
      this.user$.subscribe(data => this.user);
   }

   get(id: any) {
      return { id, service: 'Store' };
   }

   login(username: string, password: string) {
      this.store.dispatch(new AppUser({ username: username, type: username == 'admin' ? 'admin' : 'user' }));
      const promise = new Promise(resolve => {
         return resolve(true);
      })
      return promise;
   }

   _sideNavs() {
      console.log(this.user);

   }

   sideNavs() {
      let user;
      this.user$.subscribe(data => user = data).unsubscribe();
      if (user) {
         if (user.type == 'admin') {
            return [
               { link: '/admin', icon: 'public', label: 'Admin' }
            ]
         }
         else {
            return [
               { link: '/account/orders', icon: 'local_shipping', label: 'Orders' },
               { link: '/account/cancelations', icon: 'cancel', label: 'Cancelations' },
               { link: '/account/reviews', icon: 'star', label: 'Reviews' },
               { link: '/account/wishlist', icon: 'list', label: 'Wishlist' },
               { link: '/account/addresses', icon: 'location_on', label: 'Addresses' },
               { link: '/account/settings', icon: 'settings', label: 'Settings' }
            ]
         }
      }
      return [];
   }
}