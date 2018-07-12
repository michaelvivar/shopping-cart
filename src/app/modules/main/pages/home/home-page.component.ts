import { Component } from '@angular/core';
import { Page } from '~/shared';
import { PageTitle } from '~/store/actions/page.actions';

@Component({
   templateUrl: './home-page.template.html'
})
export class HomePage extends Page {

   constructor() { super() }

   ngOnInit() {
      this.store.dispatch(new PageTitle('Home'));
   }

   open() {
      this.alert('Welcome!');
   }
}