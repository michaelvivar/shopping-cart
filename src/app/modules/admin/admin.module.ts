import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonActionComponent } from './components/button-action/button-action.component';
import { AdminLayout } from './components/layout/admin-layout.component';
import { LoginPage } from './pages/login/login-page.component';
import { SharedModule } from "~/shared";

@NgModule({
   imports: [
      RouterModule.forChild([
         {
            path: '', component: AdminLayout, children: [
               { path: 'categories', loadChildren: './pages/category/category.module#CategoryModule' },
               { path: 'category', loadChildren: './pages/category/category.module#CategoryModule' },
               { path: 'products', loadChildren: './pages/product/product.module#ProductModule' },
               { path: 'product', loadChildren: './pages/product/product.module#ProductModule' },
               { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule' },
               { path: 'users', loadChildren: './pages/user/user.module#UserModule' },
               { path: 'login', component: LoginPage }
            ]
         }
      ]),
      SharedModule
   ],
   declarations: [
      AdminLayout, LoginPage, ButtonActionComponent
   ],
   entryComponents: [AdminLayout, LoginPage],
   providers: [
      { provide: 'TITLE', useValue: 'Dashboard' },
      { provide: 'THEME', useValue: 'admin-theme' },
      {
         provide: 'SIDENAVS',
         useValue: [
            { label: 'Products', link: '/admin/products', icon: 'store_mall_directory' },
            { label: 'Categories', link: '/admin/categories', icon: 'category' },
            { label: 'Users', link: '/admin/users', icon: 'group' },
            { label: 'Settings', link: '/admin/settings', icon: 'settings' },
            { label: 'Website', link: '/', icon: 'public' }
         ]
      }
   ]
})
export class AdminModule {

}