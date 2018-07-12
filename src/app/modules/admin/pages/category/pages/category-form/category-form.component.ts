import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Form } from '~/shared';
import { PageTitle, BackButton } from '~/store/actions/page.actions';
import { Category } from '~/services/models/category.model';


@Component({
   templateUrl: './category-form.template.html'
})
export class CategoryFormComponent extends Form {

   constructor(private route: ActivatedRoute) { super() }

   category: Category;

   ngOnInit() {
      this.asPage = true;
      this.formControls();
      this.category = this.route.snapshot.data['category'];
      if (this.category) {
         this.store.dispatch(new PageTitle('Edit Category: ' + this.category.name));
         this.form.get('name').setValue(this.category.name);
         this.form.get('link').setValue(this.category.link);
         this.form.get('icon').setValue(this.category.icon);
      }
      else {
         this.store.dispatch(new PageTitle('Add New Category'));
      }
      this.store.dispatch(new BackButton({ link: '/admin/categories' }));
   }

   formControls() {
      this.form = this.formbuilder.group({
         name: new FormControl(),
         icon: new FormControl(),
         link: new FormControl()
      });
      this.form.get('name').valueChanges.subscribe((value: string) => {
         const trim = value.replace(' ', '-').toLowerCase();
         this.form.get('link').setValue(`/category/${trim}`);
      })
   }
}