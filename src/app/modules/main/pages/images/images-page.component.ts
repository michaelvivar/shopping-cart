import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '~/services/models/product.model';
import { Page } from '~/shared';
import { BackButton } from '~/store/actions/page.actions';
import { ProductService } from '~/services/product/product.service';

@Component({
   templateUrl: './images-page.template.html'
})
export class ImagesPage extends Page {

   constructor(
      private route: ActivatedRoute,
      private service: ProductService
   ) { super() }

   @Select(store => store.data.product) product$: Observable<Product>;
   images: string[] = [];

   ngOnInit() {
      this.product$.subscribe(product => {
         const item = this.route.snapshot.params['item'];
         this.images = product.items.find(o => o.id == item).pictures.map(o => o.url);
         this.title = product.name;
         this.store.dispatch(new BackButton({ link: '/product/' + product.id + '/' + item }));
      }).unsubscribe();
   }
}