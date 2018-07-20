import { NgModule } from '@angular/core';
import { SharedModule } from '~/shared';
import { RouterModule } from '@angular/router';
import { ProductTablePage } from './pages/product-table/product-table.component';
import { ProductsResolver, ProductResolver, ProductWithItemsResolver, ProductWithItemResolver } from '~/services/resolvers/product.resolver';
import { ProductFormPage } from './pages/product-form/product-form.component';
import { ProductItemsPage } from './pages/product-items/product-items.component';
import { ProductImagesPage } from './pages/product-images/product-images.component';
import { FileInputModule } from '~/components';
import { ItemFormPage } from './pages/item-form/item-form.component';
import { ColorsResolver, SizesResolver } from '~/services/resolvers/settings.resolver';
import { CategoriesResolver } from '~/services/resolvers/category.resolver';

@NgModule({
   imports: [
      SharedModule, FileInputModule,
      RouterModule.forChild([
         {
            path: 'items/:id', component: ProductItemsPage,
            data: { pLevel: 3 },
            resolve: { product: ProductWithItemsResolver }
         },
         {
            path: 'item/images/:id/:itemId', component: ProductImagesPage,
            data: { pLevel: 4 },
            resolve: { product: ProductWithItemResolver }
         },
         {
            path: 'item/edit/:id/:itemId', component: ItemFormPage,
            data: { filterActive: true, pLevel: 4 },
            resolve: {
               product: ProductWithItemResolver,
               colors: ColorsResolver, sizes: SizesResolver
            }
         },
         {
            path: 'item/add/:id', component: ItemFormPage,
            data: { filterActive: true, pLevel: 4 },
            resolve: {
               product: ProductResolver,
               colors: ColorsResolver, sizes: SizesResolver
            }
         },
         {
            path: 'edit/:id', component: ProductFormPage,
            data: { filterActive: true, pLevel: 3 },
            resolve: {
               product: ProductResolver, categories: CategoriesResolver,
            }
         },
         {
            path: 'add', component: ProductFormPage,
            data: { filterActive: true, pLevel: 3 },
            resolve: {
               categories: CategoriesResolver
            }
         },
         {
            path: '', component: ProductTablePage,
            resolve: {
               products: ProductsResolver
            }
         },
      ])
   ],
   declarations: [
      ProductTablePage,
      ProductFormPage,
      ProductItemsPage,
      ProductImagesPage,
      ItemFormPage
   ]
})
export class ProductModule {

}