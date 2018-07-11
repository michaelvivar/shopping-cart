import { Observable } from "rxjs";

export abstract class BaseUserService {

   abstract user$: Observable<any>;

   navs() {
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
               { link: '/account/addresses', icon: 'location_on', label: 'Address Book' },
               { link: '/account/settings', icon: 'settings', label: 'Settings' }
            ]
         }
      }
      return [];
   }
}