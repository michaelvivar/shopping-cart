import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '~/services/models/category.model';
import { Product } from '~/services/models/product.model';
import { ProductService } from '~/services/product/product.service';
import { Form } from '~/shared';
import { BackButton, PageTitle } from '~/store/actions/page.actions';

@Component({
  templateUrl: './product-form.template.html',
  styles: ['textarea { min-height: 170px }']
})
export class ProductFormPage extends Form {

  constructor(
    private route: ActivatedRoute,
    private service: ProductService
  ) { super(true) }

  product: Product;
  categories: Category[];
  details: any;

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.categories = this.route.snapshot.data['categories'];
    this.formControls();
    if (this.product) {
      this.form.get('name').setValue(this.product.name);
      this.form.get('category').setValue(this.product.category);
      this.form.get('details').setValue(this.product.details);
      this.store.dispatch(new PageTitle('Edit: ' + this.product.name));
    }
    else {
      this.store.dispatch(new PageTitle('Add New Product'));
    }
    this.store.dispatch(new BackButton({ link: '/admin/products' }));
  }

  private formControls() {
    this.form = this.formbuilder.group({
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      details: new FormControl()
    });
  }

  save() {
    this.submitted = true;
    if (this.product) {
      this.update(this.form.value);
    }
    else {
      this.insert(this.form.value);
    }
    this.form.markAsUntouched();
  }

  private insert(values: any) {
    this.form.addControl('status', new FormControl(false));
    this.service.insert(values).then(id => {
      this.saved();
    })
  }

  private update(values: any) {
    this.service.update(this.product.id, values).then(_ => {
      this.saved();
    })
  }

  private saved() {
    this.submitted = false;
    this.openSnackBar('Saved', 'Close');
    this.store.dispatch(new PageTitle('Edit: ' + this.form.get('name').value));
  }
}