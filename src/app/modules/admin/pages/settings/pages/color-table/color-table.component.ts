import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table, sortBy } from '~/shared';
import { AddButton, PageTitle, BackButton } from '~/store/actions/page.actions';
import { Option } from '~/services/models/option.model';
import { SettingsService } from '~/services/settings/settings.service';

@Component({
   templateUrl: './color-table.template.html'
})
export class ColorTablePage extends Table {
   constructor(
      private route: ActivatedRoute,
      private service: SettingsService
   ) { super(true) }

   columns: string[] = ['action', 'text', 'value', 'status'];

   ngOnInit() {
      const colors = this.route.snapshot.data['colors'] as Option[];
      this.data = colors.sort(sortBy('-status', 'text'));
      this.store.dispatch(new PageTitle('Colors'));
      this.store.dispatch(new AddButton({ link: '/admin/settings/color/add' }));
      this.store.dispatch(new BackButton({ link: '/admin/settings' }));
   }

   toggleStatus(color: Option) {
      color.status = !color.status;
      this.service.updateColor(color.id, { status: color.status }).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}