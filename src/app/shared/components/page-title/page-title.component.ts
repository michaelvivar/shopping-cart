import { Component, Inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
   selector: 'page-title',
   templateUrl: './page-title.component.html'
})
export class PageTitleComponent {

   constructor(@Inject('TITLE') public title: string) { }

   @Select(store => store.page.title) title$: Observable<string>;

}