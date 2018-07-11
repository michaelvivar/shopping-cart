import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppUser } from '~/store/actions/app.actions';
import { Observable } from 'rxjs';
import { BaseUserService } from '~/services/user/base-user.service';

@Injectable()
export class UserStore extends BaseUserService {

   @Select(store => store.app.user) user$: Observable<any>;

   constructor(private store: Store) { super() }

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
}