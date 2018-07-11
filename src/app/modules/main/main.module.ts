import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule, DefaultLayoutComponent } from '~/shared';
import { HomePage } from '~/modules/main/pages/home/home-page.component';
import { CategoriesResolver } from '~/services/resolvers/category.resolver';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { CategoriesPage } from '~/modules/main/pages/categories/categories-page.component';
import { CartPage } from '~/modules/main/pages/cart/cart-page.component';

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      RouterModule.forChild([
         {
            path: '', component: DefaultLayoutComponent, children: [
               { path: 'categories', component: CategoriesPage, resolve: { categories: CategoriesResolver } },
               { path: 'cart', component: CartPage },
               { path: '', component: HomePage }
            ]
         }
      ]),
      MatButtonModule,
      SharedModule
   ],
   exports: [],
   declarations: [
      HomePage,
      CategoriesPage,
      CartPage
   ],
   providers: [
      { provide: 'TITLE', useValue: 'Home' }
   ]
})
export class MainModule {
}