import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetAppUser } from './store/actions/app.actions';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 6';

  constructor(store: Store) {
    //store.dispatch(new SetAppUser({ username: 'michaelvivar', type: 'admin' }))
  }
}