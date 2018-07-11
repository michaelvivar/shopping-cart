import { NgModule, ModuleWithProviders, Injectable } from "@angular/core";
import { UserService } from "~/services/user/user.service";
import { CategoryService } from "~/services/category/category.service";
import { UserStore } from "~/services/user/user.store";
import { CategoryStore } from "~/services/category/category.store";

@NgModule({
})
export class ServiceModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [UserService, CategoryService]
      }
   }

   static forFirestore(): ModuleWithProviders {
      return {
         ngModule: ServiceModule,
         providers: [
            { provide: UserService, useClass: UserStore },
            { provide: CategoryService, useClass: CategoryStore },
            { provide: 'LOGIN_SERVICE', useClass: UserStore },
            { provide: 'SIGNUP_SERVICE', useClass: UserStore }
         ]
      }
   }
}