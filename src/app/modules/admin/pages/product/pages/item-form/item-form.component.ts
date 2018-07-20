import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Form } from '~/shared';
import { Product, Item } from '~/services/models/product.model';
import { FormControl, Validators } from '@angular/forms';
import { ProductService } from '~/services/product/product.service';
import { Option } from '~/services/models/option.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
      templateUrl: './item-form.template.html',
      styles: ['textarea { min-height: 170px }']
})
export class ItemFormPage extends Form {

      constructor(
            private route: ActivatedRoute,
            private service: ProductService
      ) { super(true) }

      item: Item;
      product: Product;
      colors: Option[];
      colors$: Observable<Option[]>;
      sizes: Option[];
      sizes$: Observable<Option[]>;

      ngOnInit() {
            this.product = this.route.snapshot.data['product'];
            this.colors = this.route.snapshot.data['colors'];
            this.sizes = this.route.snapshot.data['sizes'];
            this.formControls();
            if (this.product && this.product.items && this.product.items.length > 0) {
                  this.item = this.product.items[0];
                  this.form.get('price').setValue(this.item.price);
                  this.form.get('color').setValue(this.item.color);
                  this.form.get('size').setValue(this.item.size);
                  this.title = 'Edit Item: ' + this.product.name;
            }
            else {
                  this.title = 'Add New Product Item';
            }
            this.backButton('/admin/product/items/' + this.product.id);
      }

      private formControls() {
            this.form = this.formbuilder.group({
                  price: new FormControl(null, [Validators.required, Validators.min(1)]),
                  color: new FormControl(),
                  size: new FormControl()
            });
            this.colors$ = this.form.get('color').valueChanges
                  .pipe(startWith(''), map(state => state ? this.filterColor(state) : this.colors.slice()));
            this.sizes$ = this.form.get('size').valueChanges
                  .pipe(startWith(''), map(state => state ? this.filterSize(state) : this.sizes.slice()));
      }

      private filterColor(value: string): Option[] {
            const filterValue = value.toLowerCase();
            return this.colors.filter(state => state.text.toLowerCase().indexOf(filterValue) === 0);
      }

      private filterSize(value: string): Option[] {
            const filterValue = value.toLowerCase();
            return this.sizes.filter(state => state.text.toLowerCase().indexOf(filterValue) === 0);
      }

      save() {
            this.submitted = true;
            if (this.item) {
                  this.update(this.form.value);
            }
            else {
                  this.insert(this.form.value);
            }
            this.form.markAsUntouched();
      }

      private parseAmount() {
            const price: string = this.form.get('price').value;
            const amount: number = parseFloat(price.replace(/[^0-9\.]/g, ''));
            return amount;
      }

      private insert(values: any) {
            this.form.addControl('status', new FormControl(false));
            values.price = this.parseAmount();
            this.service.insertItem(this.product.id, values).then(id => {
                  this.saved();
                  this.title = 'Edit Item: ' + this.product.name;
            })
      }

      private update(values: any) {
            values.price = this.parseAmount();
            this.service.updateItem(this.product.id, this.item.id, values).then(_ => {
                  this.saved();
            })
      }

      private saved() {
            this.submitted = false;
            this.openSnackBar('Saved', 'Close');
      }
}