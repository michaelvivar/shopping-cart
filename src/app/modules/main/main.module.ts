import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductOptionComponent } from './components/product-option/product-option.component';
import { ProductComponent } from './components/product/product.component';
import { CartPage } from './pages/cart/cart-page.component';
import { CategoriesPage } from './pages/categories/categories-page.component';
import { HomePage } from './pages/home/home-page.component';
import { ImagesPage } from './pages/images/images-page.component';
import { ProductPage } from './pages/product/product-page.component';
import { SharedModule, MobileLayout, DefaultLayout, AuthGuard } from '~/shared';
import { CategoriesResolver } from '~/services/resolvers/category.resolver';
import { ProductWithItemsResolver } from '~/services/resolvers/product.resolver';
import { ProductRatingComponent } from './components/product-rating/product-rating.component';
import { ProductRatingDirective } from './components/product-rating/product-rating.directive';
import { ProductReviewComponent } from './components/product-review/product-review.component';


@NgModule({
   imports: [
      RouterModule.forChild([
         {
            path: '', component: ContentComponent, children: [
               // { path: 'account', loadChildren: './../account/account.module#AccountModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
               { path: 'account', loadChildren: './../account/account.module#AccountModule' },
               {
                  path: 'categories', component: CategoriesPage,
                  data: { filterActive: true, pLevel: 1.2 },
                  resolve: { categories: CategoriesResolver }
               },
               {
                  path: 'product/:id/:item', component: ProductPage,
                  data: { pLevel: 1.3 },
                  resolve: { product: ProductWithItemsResolver }
               },
               {
                  path: 'product/images/:id/:item', component: ImagesPage,
                  data: { pLevel: 2 },
                  resolve: { product: ProductWithItemsResolver }
               },
               {
                  path: 'cart', component: CartPage,
                  data: { pLevel: 1.4 }
               },
               {
                  path: '', component: HomePage,
                  data: { pLevel: 1.5 }
               }
            ]
         }
      ]),
      SharedModule
   ],
   exports: [],
   declarations: [
      HomePage,
      CategoriesPage,
      CartPage,
      ProductPage,
      ImagesPage,
      ContentComponent,
      ProductComponent, ProductDetailsComponent,
      ProductItemComponent, ProductOptionComponent,
      ProductRatingComponent, ProductRatingDirective,
      ProductReviewComponent
   ],
   entryComponents: [MobileLayout, DefaultLayout],
   providers: [
      { provide: 'TITLE', useValue: 'Home' }
   ]
})
export class MainModule {
}