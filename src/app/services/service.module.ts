import { ModuleWithProviders, NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from "~services/interceptors/api.interceptor";
import { ProductService } from "~services/product.service";
import { ProductStore } from "~services/product-store.service";
import { UserService } from "~services/user.service";
import { UserStore } from "~services/user-store.service";
import { CategoryService } from "~services/category.service";
import { CategoryStore } from "~services/category-store.service";

@NgModule({})
export class ServiceModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [ProductService,
            { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
         ]
      }
   }

   static forFirestore(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [
            { provide: ProductService, useClass: ProductStore },
            { provide: CategoryService, useClass: CategoryStore },
            { provide: UserService, useClass: UserStore }
         ]
      }
   }
}