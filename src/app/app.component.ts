import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { Store } from '@ngxs/store';
import { CategoryService } from '~/services/category/category.service';
import { CategoriesData } from '~/store/actions/data.actions';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(router: Router, private store: Store, private categoryService: CategoryService) {

      router.events.subscribe((event: Event) => {
         if (event instanceof NavigationStart) {
            this.progress = 5;
         }
         else if (event instanceof NavigationEnd) {
            this.progress = 100;
         }
         else if (event instanceof NavigationCancel) {
            this.progress = 100;
         }
         else if (event instanceof NavigationError) {
            router.navigate(['error']);
         }
      })
   }

   ngOnInit() {
      this.categoryService.all().subscribe(data => {
         this.store.dispatch(new CategoriesData(data));
      });
   }

   progress: number = 0;
}