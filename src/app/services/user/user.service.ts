import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppUser } from '~/store/actions/app.actions';
import { BaseUserService } from '~/services/user/base-user.service';
import { Observable } from 'rxjs';
import { User } from '~/services/models/user.model';

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

   allAsync(filterActive = true): Promise<User[]> {
      return null;
   }

   insert(user: User): Promise<any> {
      return null;
   }

   update(id: any, user: User | { status: boolean }): Promise<void> {
      return null;
   }
}