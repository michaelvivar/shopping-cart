import { Component } from '@angular/core';
import { Table, sortBy } from '~/shared';
import { ActivatedRoute } from '@angular/router';
import { Product } from '~/services/models/product.model';
import { PageTitle, AddButton } from '~/store/actions/page.actions';
import { ProductService } from '~/services/product/product.service';

@Component({
   templateUrl: './product-table.template.html'
})
export class ProductTablePage extends Table {

   constructor(
      private route: ActivatedRoute,
      private service: ProductService
   ) { super(true) }

   columns: string[] = ['action', 'name', 'status'];

   ngOnInit() {
      const products = this.route.snapshot.data['products'] as Product[] || [];
      this.data = products.sort(sortBy('-status', 'name'));
      this.store.dispatch(new PageTitle('Products'));
      this.store.dispatch(new AddButton({ link: '/admin/product/add' }));
   }

   toggleStatus(product: Product) {
      const status = !product.status;
      this.service.update(product.id, { status }).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}