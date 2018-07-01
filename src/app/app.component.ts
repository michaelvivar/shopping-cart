import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetAppUser } from '~store/actions/app.actions';

@Component({
   selector: 'my-app',
   template: '<router-outlet></router-outlet>'
})
export class AppComponent {
   constructor(store: Store) {
      //store.dispatch(new SetAppUser({ username: 'michaelvivar', type: 'admin' }))
   }
}