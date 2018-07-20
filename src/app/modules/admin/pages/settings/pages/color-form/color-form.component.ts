import { Component } from '@angular/core';
import { Form } from '~/shared';
import { Validators, FormControl } from '@angular/forms';
import { Option } from '~/services/models/option.model';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '~/services/settings/settings.service';

@Component({
   templateUrl: './color-form.template.html'
})
export class ColorFormPage extends Form {

   constructor(
      private route: ActivatedRoute,
      private service: SettingsService
   ) { super(true) }

   color: Option;

   ngOnInit() {
      this.color = this.route.snapshot.data['color'];
      this.formControls();
      if (this.color) {
         this.form.get('text').setValue(this.color.text);
         this.form.get('value').setValue(this.color.value);
         this.title = 'Edit: ' + this.color.text;
      }
      else {
         this.title = 'Add New Color';
      }
      this.backButton('/admin/settings/colors');
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
      if (this.color) {
         this.update(this.form.value);
      }
      else {
         this.insert(this.form.value);
      }
      this.form.markAsUntouched();
   }

   private insert(values: any) {
      this.form.addControl('status', new FormControl(false));
      this.service.insertColor(values).then(id => {
         this.saved();
      })
   }

   private update(values: any) {
      this.service.updateColor(this.color.id, values).then(_ => {
         this.saved();
      })
   }

   private saved() {
      this.submitted = false;
      this.openSnackBar('Saved', 'Close');
      this.title = 'Edit: ' + this.form.get('text').value;
   }
}