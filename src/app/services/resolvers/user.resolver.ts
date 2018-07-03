import { Injectable } from "@angular/core";
import { UserService } from "~/services/user/user.service";

@Injectable({ providedIn: 'root' })
export class UserSideNavsResolver {
   constructor(private service: UserService) { }

   resolve() {
      return this.service.sideNavs();
   }
}