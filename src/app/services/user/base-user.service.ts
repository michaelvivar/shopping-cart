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

         }
      }
      return [];
   }
}