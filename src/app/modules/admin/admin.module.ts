import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~/shared";
import { AdminLayout } from "./components/layout/admin-layout.component";
import { ButtonActionComponent } from "./components/button-action/button-action.component";
import { LoginPage } from "./pages/login/login-page.component";

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