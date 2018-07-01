import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './account-navlist-page.template.html'
})
export class AccountNavListPage {

  @Select(store => store.app.user) user$: Observable<any>;
}