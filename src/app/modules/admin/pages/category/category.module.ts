import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~/shared";
import { CategoriesResolver, CategoryResolver } from "~/services/resolvers/category.resolver";
import { CategoryTableComponent } from "./pages/category-table/category-table.component";
import { CategoryFormComponent } from "./pages/category-form/category-form.component";

@NgModule({
   imports: [
      RouterModule.forChild([
         { path: '', component: CategoryTableComponent, resolve: { categories: CategoriesResolver } },
         { path: 'edit/:id', component: CategoryFormComponent, resolve: { category: CategoryResolver } },
         { path: 'add', component: CategoryFormComponent }
      ]),
      SharedModule
   ],
   declarations: [
      CategoryTableComponent, CategoryFormComponent
   ],
   providers: [
   ]
})
export class CategoryModule {

}