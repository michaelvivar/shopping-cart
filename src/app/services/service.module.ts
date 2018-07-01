import { ModuleWithProviders, NgModule } from "@angular/core";
import { ProductService } from "~services/product.service";
import { ProductStore } from "~services/product-store.service";
import { UserService } from "~services/user.service";
import { UserStore } from "~services/user-store.service";

@NgModule({})
export class ServiceModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [ProductService]
      }
   }

   static forFirestore(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [
            { provide: ProductService, useClass: ProductStore },
            { provide: UserService, useClass: UserStore }
         ]
      }
   }
}