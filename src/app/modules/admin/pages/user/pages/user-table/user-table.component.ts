import { Component } from '@angular/core';
import { Table, sortBy } from '~/shared';
import { ActivatedRoute } from '@angular/router';
import { User } from '~/services/models/user.model';
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
      this.title = 'Users';
      this.addButton('/admin/user/add');
   }

   toggleStatus(user: User) {
      const status = !user.status;
      this.service.update(user.id, { status }).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}