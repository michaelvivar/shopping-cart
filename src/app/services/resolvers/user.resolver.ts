import { Injectable } from "@angular/core";
import { UserService } from "~/services/user/user.service";

@Injectable({ providedIn: 'root' })
export class UserNavsResolver {
   constructor(private service: UserService) { }

   resolve() {
      return this.service.navs();
   }
}