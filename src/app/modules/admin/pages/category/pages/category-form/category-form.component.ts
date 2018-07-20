import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '~/shared';
import { PageTitle, BackButton } from '~/store/actions/page.actions';
import { Category } from '~/services/models/category.model';
import { CategoryService } from '~/services/category/category.service';


@Component({
   templateUrl: './category-form.template.html'
})
export class CategoryFormPage extends Form {

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: CategoryService
   ) { super(true) }

   category: Category;

   ngOnInit() {
      this.formControls();
      this.category = this.route.snapshot.data['category'];
      if (this.category) {
         this.title = 'Edit Category: ' + this.category.name;
         this.form.get('name').setValue(this.category.name);
         this.form.get('link').setValue(this.category.link);
         this.form.get('icon').setValue(this.category.icon);
      }
      else {
         this.title = 'Add New Category';
      }
      this.backButton('/admin/categories');
   }

   private formControls() {
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

   save() {
      this.submitted = true;
      if (this.category) {
         this.update();
      }
      else {
         this.insert();
      }
      this.form.markAsUntouched();
   }

   private insert() {
      this.form.addControl('status', new FormControl(false));
      this.service.insert(this.form.value).then(id => {
         this.saved();
      })
   }

   private update() {
      this.service.update(this.category.id, this.form.value).then(_ => {
         this.saved();
      })
   }

   private saved() {
      this.submitted = false;
      this.openSnackBar('Saved', 'Close');
      this.title = 'Edit: ' + this.form.get('name').value;
   }
}