import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~/shared";
import { CategoriesResolver, CategoryResolver } from "~/services/resolvers/category.resolver";
import { CategoryTablePage } from "./pages/category-table/category-table.component";
import { CategoryFormPage } from "./pages/category-form/category-form.component";

@NgModule({
   imports: [
      RouterModule.forChild([
         { path: '', component: CategoryTablePage, resolve: { categories: CategoriesResolver } },
         { path: 'edit/:id', component: CategoryFormPage, resolve: { category: CategoryResolver } },
         { path: 'add', component: CategoryFormPage }
      ]),
      SharedModule
   ],
   declarations: [
      CategoryTablePage, CategoryFormPage
   ],
   providers: [
   ]
})
export class CategoryModule {

}