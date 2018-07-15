import { Component } from '@angular/core';
import { Form } from '~/shared';
import { Validators, FormControl } from '@angular/forms';
import { Option } from '~/services/models/option.model';
import { ActivatedRoute } from '@angular/router';
import { PageTitle, BackButton } from '~/store/actions/page.actions';
import { SettingsService } from '~/services/settings/settings.service';

@Component({
   templateUrl: './size-form.template.html'
})
export class SizeFormPage extends Form {

   constructor(
      private route: ActivatedRoute,
      private service: SettingsService
   ) { super(true) }

   size: Option;

   ngOnInit() {
      this.size = this.route.snapshot.data['size'];
      this.formControls();
      if (this.size) {
         this.form.get('text').setValue(this.size.text);
         this.form.get('value').setValue(this.size.value);
         this.store.dispatch(new PageTitle('Edit: ' + this.size.text));
      }
      else {
         this.store.dispatch(new PageTitle('Add New Size'));
      }
      this.store.dispatch(new BackButton({ link: '/admin/settings/sizes' }));
   }

   formControls() {
      this.form = this.formbuilder.group({
         text: new FormControl(null, Validators.required),
         value: new FormControl(null, Validators.required)
      });
      this.subscription = this.form.get('text').valueChanges.subscribe(value => {
         this.form.get('value').setValue(value);
      })
   }

   save() {
      this.submitted = true;
      if (this.size) {
         this.update(this.form.value);
      }
      else {
         this.insert(this.form.value);
      }
      this.form.markAsUntouched();
   }

   private insert(values: any) {
      this.form.addControl('status', new FormControl(false));
      this.service.insertSize(values).then(id => {
         this.saved();
      })
   }

   private update(values: any) {
      this.service.updateSize(this.size.id, values).then(_ => {
         this.saved();
      })
   }

   private saved() {
      this.submitted = false;
      this.openSnackBar('Saved', 'Close');
      this.store.dispatch(new PageTitle('Edit: ' + this.form.get('text').value));
   }
}