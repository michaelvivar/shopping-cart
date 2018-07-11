import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~/shared";
import { NavListModule, NavListComponent } from "~/components";
import { CategoriesResolver } from "~/modules/admin/categories/services/resolvers/category.resolver";

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule,
      RouterModule.forChild([
         { path: '', component: NavListComponent, resolve: { navs: CategoriesResolver } }
      ]),
      SharedModule, NavListModule
   ],
   declarations: [],
   providers: [
      { provide: 'TITLE', useValue: 'Categories' }
   ]
})
export class CategoryModule {

}