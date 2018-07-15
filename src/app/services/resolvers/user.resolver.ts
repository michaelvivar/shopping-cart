import { Injectable } from "@angular/core";
import { UserService } from "~/services/user/user.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

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

@Injectable({ providedIn: 'root' })
export class UsersResolver {
   constructor(private service: UserService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.allAsync((filterActive == true) ? true : false);
   }
}