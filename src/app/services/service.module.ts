import { ModuleWithProviders, NgModule } from "@angular/core";
import { ProductService } from "./product.service";
import { ProductStore } from "./product-store.service";

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
        { provide: ProductService, useClass: ProductStore }
      ]
    }
  }
}