import { Component, Input } from '@angular/core';
import { ProductService } from '~/services/product/product.service';
import { Observable } from 'rxjs';
import { Review, Product } from '~/services/models/product.model';
import { Select } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { BaseComponent } from '~/shared';

@Component({
   selector: 'product-review',
   templateUrl: './product-review.template.html'
})
export class ProductReviewComponent extends BaseComponent {

   constructor(private service: ProductService) { super() }

   @Select(store => store.data.product) product$: Observable<Product>;
   product: Product;
   @Input('limit') limit: number;
   reviews: Review[];

   ngOnInit() {
      this.subscription = this.product$.pipe(tap(product => this.product = product), switchMap(product => {
         return this.service.getReviews(product.id, this.limit);
      })).subscribe(data => this.reviews = data);
   }
}