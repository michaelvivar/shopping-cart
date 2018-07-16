import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, MobileLayout, DefaultLayout, AuthGuard } from '~/shared';
import { CategoriesResolver } from '~/services/resolvers/category.resolver';
import { HomePage } from './pages/home/home-page.component';
import { CategoriesPage } from './pages/categories/categories-page.component';
import { CartPage } from './pages/cart/cart-page.component';
import { ContentComponent } from './components/content/content.component';
import { ContentDirective } from './components/content/content.directive';
import { ProductComponent } from './components/product/product.component';
import { ProductPage } from './pages/product/product-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductOptionComponent } from './components/product-option/product-option.component';
import { ImagesPage } from './pages/images/images-page.component';
import { ProductResolver } from '~/services/resolvers/product.resolver';


@NgModule({
   imports: [
      RouterModule.forChild([
         {
            path: '', component: ContentComponent, children: [
               // { path: 'account', loadChildren: './../account/account.module#AccountModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
               { path: 'account', loadChildren: './../account/account.module#AccountModule' },
               {
                  path: 'categories', component: CategoriesPage,
                  data: { filterActive: true },
                  resolve: { categories: CategoriesResolver }
               },
               { path: 'product/:id/:item', component: ProductPage },
               { path: 'product/images/:id/:item', component: ImagesPage, resolve: { product: ProductResolver } },
               { path: 'cart', component: CartPage },
               { path: '', component: HomePage }
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
      ContentComponent, ContentDirective,
      ProductComponent, ProductDetailsComponent,
      ProductItemComponent, ProductOptionComponent
   ],
   entryComponents: [MobileLayout, DefaultLayout],
   providers: [
      { provide: 'TITLE', useValue: 'Home' }
   ]
})
export class MainModule {
}