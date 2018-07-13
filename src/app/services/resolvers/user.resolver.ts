import { Injectable } from "@angular/core";
import { UserService } from "~/services/user/user.service";
import { Resolve } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UserNavsResolver implements Resolve<any[]> {
   constructor(private service: UserService) { }

   resolve() {
      return [
         { link: '/account/orders', icon: 'local_shipping', label: 'Orders' },
         { link: '/account/cancelations', icon: 'cancel', label: 'Cancelations' },
         { link: '/account/reviews', icon: 'star', label: 'Reviews' },
         { link: '/account/wishlist', icon: 'list', label: 'Wishlist' },
         { link: '/account/addresses', icon: 'location_on', label: 'Address Book' },
         { link: '/account/settings', icon: 'settings', label: 'Settings' },
         { link: '/account/logout', icon: 'subdirectory_arrow_left', label: 'Log Out' }
      ]
   }
}