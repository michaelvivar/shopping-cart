import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
   selector: 'button-action',
   templateUrl: './button-action.template.html',
   styles: ['button { margin-right: 0px']
})
export class ButtonActionComponent {

   @Select(store => store.page.buttons) buttons$: Observable<any>;
}