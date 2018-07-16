import { Component } from '@angular/core';
import { Page } from '~/shared';
import { PageTitle } from '~/store/actions/page.actions';
import { ProductService } from '~/services/product/product.service';
import { Observable } from 'rxjs';
import { Product } from '~/services/models/product.model';

@Component({
   templateUrl: './home-page.template.html'
})
export class HomePage extends Page {

   constructor(
      private service: ProductService
   ) { super() }

   products$: Observable<Product[]>;

   ngOnInit() {
      this.products$ = this.service.all();
      this.store.dispatch(new PageTitle('Home'));
   }

   open() {
      this.alert('Welcome!');
   }
}