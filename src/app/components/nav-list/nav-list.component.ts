import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
   templateUrl: './nav-list.template.html'
})
export class NavListComponent {
   constructor(private route: ActivatedRoute) { }

   navs: any[] = [];

   ngOnInit() {
      this.navs = this.route.snapshot.data['navs'];
   }
}