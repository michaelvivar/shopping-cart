import { Component } from '@angular/core';
import { Table, sortBy } from '~/shared';
import { ActivatedRoute } from '@angular/router';
import { User } from '~/services/models/user.model';
import { PageTitle, AddButton } from '~/store/actions/page.actions';
import { UserService } from '~/services/user/user.service';

@Component({
   templateUrl: './user-table.template.html'
})
export class UserTablePage extends Table {

   constructor(
      private route: ActivatedRoute,
      private service: UserService
   ) { super(true) }

   columns: string[] = ['action', 'username', 'type', 'provider', 'status'];

   ngOnInit() {
      const users = this.route.snapshot.data['users'] as User[];
      this.data = users.sort(sortBy('-status', 'username'));
      this.store.dispatch(new PageTitle('Users'));
      this.store.dispatch(new AddButton({ link: '/admin/user/add' }));
   }

   toggleStatus(user: User) {
      const status = !user.status;
      this.service.update(user.id, { status }).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}