import { Component, Input } from '@angular/core';
import { ProductService } from '~/services/product/product.service';
import { BaseComponent } from '~/shared';
import { Review } from '~/services/models/product.model';

@Component({
   selector: 'product-rating',
   templateUrl: './product-rating.template.html',
   styleUrls: ['./product-rating.style.css']
})
export class ProductRatingComponent extends BaseComponent {

   constructor(private service: ProductService) { super() }

   @Input('id') product: any;
   rate: number = 0;
   count: number = 0;

   ngOnInit() {
      this.subscription = this.service.getRatings(this.product).subscribe(data => {
         if (data.length > 0) {
            this.count = data.length;
            this.rate = data.reduce((total, current) => total + current) / data.length;
         }
      });
   }

   stars = [
      { shade: 'half', value: 0.5 },
      { shade: 'full', value: 1 },
      { shade: 'half', value: 1.5 },
      { shade: 'full', value: 2 },
      { shade: 'half', value: 2.5 },
      { shade: 'full', value: 3 },
      { shade: 'half', value: 3.5 },
      { shade: 'full', value: 4 },
      { shade: 'half', value: 4.5 },
      { shade: 'full', value: 5 }
   ].reverse();
}