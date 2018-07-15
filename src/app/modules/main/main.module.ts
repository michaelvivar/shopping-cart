import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, MobileLayout, DefaultLayout, AuthGuard } from '~/shared';
import { CategoriesResolver } from '~/services/resolvers/category.resolver';
import { HomePage } from './pages/home/home-page.component';
import { CategoriesPage } from './pages/categories/categories-page.component';
import { CartPage } from './pages/cart/cart-page.component';
import { ContentComponent } from './components/content/content.component';
import { ContentDirective } from './components/content/content.directive';


@NgModule({
   imports: [
      RouterModule.forChild([
         {
            path: '', component: ContentComponent, children: [
               // { path: 'account', loadChildren: './../account/account.module#AccountModule', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
               { path: 'account', loadChildren: './../account/account.module#AccountModule' },
               { path: 'categories', component: CategoriesPage, resolve: { categories: CategoriesResolver } },
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
      ContentComponent, ContentDirective
   ],
   entryComponents: [MobileLayout, DefaultLayout],
   providers: [
      { provide: 'TITLE', useValue: 'Home' }
   ]
})
export class MainModule {
}