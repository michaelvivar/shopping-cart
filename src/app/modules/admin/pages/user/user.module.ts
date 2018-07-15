import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/shared';
import { UserTablePage } from './pages/user-table/user-table.component';
import { UsersResolver } from '~/services/resolvers/user.resolver';

@NgModule({
   imports: [
      SharedModule,
      RouterModule.forChild([
         {
            path: '', component: UserTablePage,
            resolve: { users: UsersResolver }
         }
      ])
   ],
   declarations: [
      UserTablePage
   ]
})
export class UserModule {

}