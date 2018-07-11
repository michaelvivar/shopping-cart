import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule, DefaultLayoutComponent } from "~/shared";

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      RouterModule.forChild([
         {
            path: '', component: DefaultLayoutComponent, children: [
               { path: 'categories', loadChildren: './categories/category.module#CategoryModule' }
            ]
         }
      ]),
      SharedModule
   ],
   declarations: [],
   providers: [
      { provide: 'TITLE', useValue: 'Admin' },
      { provide: 'THEME', useValue: 'admin-theme' },
      {
         provide: 'SIDENAVS',
         useValue: [
            { label: 'Products', link: '/admin/products', icon: 'store_mall_directory' },
            { label: 'Categories', link: '/admin/categories', icon: 'category' },
            { label: 'Users', link: '/admin/users', icon: 'group' },
            { label: 'Website', link: '/', icon: 'public' },
            { label: 'Account', link: '/account', icon: 'account_circle' }
         ]
      }
   ]
})
export class AdminModule {

}