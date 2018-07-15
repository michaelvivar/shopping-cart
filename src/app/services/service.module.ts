import { NgModule, ModuleWithProviders, Injectable } from "@angular/core";
import { UserService } from "~/services/user/user.service";
import { CategoryService } from "~/services/category/category.service";
import { UserStore } from "~/services/user/user.store";
import { CategoryStore } from "~/services/category/category.store";
import { ProductStore } from "~/services/product/product.store";
import { ProductService } from "~/services/product/product.service";
import { ImageService } from "~/services/image/image.service";
import { ImageStore } from "~/services/image/image.store";
import { SettingsService } from "~/services/settings/settings.service";
import { SettingsStore } from "~/services/settings/settings.store";

@NgModule({
})
export class ServiceModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [
            UserService, CategoryService, ProductService,
            ImageService, SettingsService
         ]
      }
   }

   static forFirestore(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [
            { provide: UserService, useClass: UserStore },
            { provide: CategoryService, useClass: CategoryStore },
            { provide: ProductService, useClass: ProductStore },
            { provide: ImageService, useClass: ImageStore },
            { provide: SettingsService, useClass: SettingsStore },
            { provide: 'LOGIN_SERVICE', useClass: UserStore },
            { provide: 'SIGNUP_SERVICE', useClass: UserStore }
         ]
      }
   }
}