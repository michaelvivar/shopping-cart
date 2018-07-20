import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table, sortBy } from '~/shared';
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
      this.title = 'Colors';
      this.addButton('/admin/settings/color/add');
      this.backButton('/admin/settings');
   }

   toggleStatus(color: Option) {
      color.status = !color.status;
      this.service.updateColor(color.id, { status: color.status }).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}