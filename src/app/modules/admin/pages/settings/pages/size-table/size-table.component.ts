import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table, sortBy } from '~/shared';
import { AddButton, PageTitle, BackButton } from '~/store/actions/page.actions';
import { Option } from '~/services/models/option.model';
import { SettingsService } from '~/services/settings/settings.service';

@Component({
   templateUrl: './size-table.template.html'
})
export class SizeTablePage extends Table {
   constructor(
      private route: ActivatedRoute,
      private service: SettingsService
   ) { super(true) }

   columns: string[] = ['action', 'text', 'value', 'status'];

   ngOnInit() {
      const sizes = this.route.snapshot.data['sizes'] as Option[];
      this.data = sizes.sort(sortBy('-status', 'text'));
      this.store.dispatch(new PageTitle('Sizes'));
      this.store.dispatch(new AddButton({ link: '/admin/settings/size/add' }));
      this.store.dispatch(new BackButton({ link: '/admin/settings' }));
   }

   toggleStatus(size: Option) {
      size.status = !size.status;
      this.service.updateSize(size.id, { status: size.status }).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}