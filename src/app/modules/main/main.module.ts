import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule, DefaultLayoutComponent } from '~/shared';
import { HomePage } from '~/modules/main/pages/home/home-page.component';
import { CategoriesResolver } from '~/services/resolvers/category.resolver';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavListComponent, NavListModule } from '~/components';

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      RouterModule.forChild([
         {
            path: '', component: DefaultLayoutComponent, children: [
               { path: 'categories', component: NavListComponent, resolve: { navs: CategoriesResolver } },
               { path: '**', component: HomePage }
            ]
         }
      ]),
      SharedModule, NavListModule
   ],
   exports: [],
   declarations: [
      HomePage
   ],
   providers: [
      { provide: 'TITLE', useValue: 'Shopping Cart' }
   ]
})
export class MainModule {
}