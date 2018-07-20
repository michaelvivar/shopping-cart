import { Component } from '@angular/core';
import { Table, sortBy } from '~/shared';
import { ActivatedRoute } from '@angular/router';
import { Product, Item } from '~/services/models/product.model';
import { ProductService } from '~/services/product/product.service';

@Component({
   templateUrl: './product-items.template.html'
})
export class ProductItemsPage extends Table {

   constructor(
      private route: ActivatedRoute,
      private service: ProductService
   ) { super(true) }

   columns: string[] = ['action', 'price', 'color', 'size', 'status'];
   product: Product;

   ngOnInit() {
      this.product = this.route.snapshot.data['product'] as Product;
      this.data = this.product.items;
      this.title = 'Items: ' + this.product.name;
      this.backButton('/admin/products');
      this.addButton('/admin/product/item/add/' + this.product.id);
   }

   toggleStatus(item: Item) {
      item.status = !item.status;
      this.service.updateItem(this.product.id, item.id, { status: item.status }).then(_ => {
         this.data = this.dataSource.data.sort(sortBy('-status', 'name'));
      });
   }
}