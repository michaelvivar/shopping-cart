import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppUser } from '~/store/actions/app.actions';
import { BaseUserService } from '~/services/user/base-user.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseUserService {

   constructor(private store: Store) { super() }

   @Select(store => store.app.user) user$: Observable<any>;

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
}