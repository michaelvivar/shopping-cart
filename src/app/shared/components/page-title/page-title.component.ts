import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
   selector: 'page-title',
   templateUrl: './page-title.component.html'
})
export class PageTitleComponent {

   @Select(store => store.page.title) title$: Observable<string>;

}