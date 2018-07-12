import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
   selector: 'back-button',
   templateUrl: './back-button.template.html'
})
export class BackButtonComponent {

   @Select(store => store.page.buttons) buttons$: Observable<any>;
}