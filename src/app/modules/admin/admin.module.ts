import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/shared';

import { ButtonActionComponent } from './components/button-action/button-action.component';
import { AdminLayout } from './components/layout/admin-layout.component';
import { LoginPage } from './pages/login/login-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AdminLayout, children: [
          { path: 'categories', data: { pLevel: 1.1 }, loadChildren: './pages/category/category.module#CategoryModule' },
          { path: 'category', data: { pLevel: 2 }, loadChildren: './pages/category/category.module#CategoryModule' },
          { path: 'products', data: { pLevel: 1.2 }, loadChildren: './pages/product/product.module#ProductModule' },
          { path: 'product', data: { pLevel: 2 }, loadChildren: './pages/product/product.module#ProductModule' },
          { path: 'settings', data: { pLevel: 1.3 }, loadChildren: './pages/settings/settings.module#SettingsModule' },
          { path: 'users', data: { pLevel: 1.4 }, loadChildren: './pages/user/user.module#UserModule' },
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