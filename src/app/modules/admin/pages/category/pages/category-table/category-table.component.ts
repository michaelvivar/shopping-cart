import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table, sortBy } from '~/shared';
import { PageTitle, AddButton } from '~/store/actions/page.actions';
import { Category } from '~/services/models/category.model';
import { CategoryService } from '~/services/category/category.service';

@Component({
   templateUrl: './category-table.template.html',
   styles: [
      '.mat-menu-panel { min-width: 130px }',
      'td.mat-cell:first-child { padding-left: 5px !important }'
   ]
})
export class CategoryTableComponent extends Table {

   constructor(
      private route: ActivatedRoute,
      private service: CategoryService
   ) { super() }

   columns: string[] = ['action', 'name', 'status'];

   ngOnInit() {
      this.asPage = true;
      const categories = this.route.snapshot.data['categories'] as Category[];
      if (categories) {
         this.data = categories.sort(sortBy('-status', 'name'))
      }
      this.store.dispatch(new PageTitle('Categories'));
      this.store.dispatch(new AddButton({ link: '/admin/category/add' }));
   }

   changeStatus(category: Category) {
      category.status = !category.status;
      this.service.update(category).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}