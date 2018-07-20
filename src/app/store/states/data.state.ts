import { Product } from "~/services/models/product.model";
import { State, Action, StateContext, Store } from "@ngxs/store";
import { ProductData, CategoriesData } from "~/store/actions/data.actions";
import { Category } from "~/services/models/category.model";

interface DataStateModel {
   product: Product;
   categories: Category[];
}

@State<DataStateModel>({
   name: 'data'
})
export class DataState {

   @Action(ProductData)
   setProduct(context: StateContext<DataStateModel>, { payload }: ProductData) {
      context.patchState({ product: payload });
   }

   @Action(CategoriesData)
   setCategories(context: StateContext<DataStateModel>, { payload }: CategoriesData) {
      context.patchState({ categories: payload });
   }
}