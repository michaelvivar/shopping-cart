import { Component } from '@angular/core';
import { Page } from '~/shared';
import { ActivatedRoute } from '@angular/router';
import { PageTitle } from '~/store/actions/page.actions';

@Component({
   templateUrl: './main-page.template.html'
})
export class MainPage extends Page {
   constructor(
      private route: ActivatedRoute
   ) { super() }

   navs: any[];

   ngOnInit() {
      this.navs = this.route.snapshot.data['navs'];
      this.store.dispatch(new PageTitle('Account'));
   }
}