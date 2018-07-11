import { Component } from '@angular/core';
import { Page } from '~/shared';

@Component({
   templateUrl: './home-page.template.html'
})
export class HomePage extends Page {

   constructor() { super() }

   open() {
      this.alert('Welcome!');
   }
}