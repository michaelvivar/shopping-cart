import { Component } from '@angular/core';
import { Page } from '~/shared';
import { PageTitle } from '~/store/actions/page.actions';

@Component({
   templateUrl: './main-page.template.html'
})
export class MainPage extends Page {

   ngOnInit() {
      this.title = 'Settings';
   }
}