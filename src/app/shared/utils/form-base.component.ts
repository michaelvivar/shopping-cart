import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from './base.component';
import { ServiceLocator } from './service-locator';

export class Form extends BaseComponent {
   constructor() {
      super();
      this.formbuilder = ServiceLocator.injector.get(FormBuilder);
   }

   formbuilder: FormBuilder;
   form: FormGroup;
   submitted = false;
   dirty = false;

   ngAfterContentInit() {
      if (this.form) {
         this.subscription = this.form.valueChanges.subscribe(data => {
            this.validate(data);
            if (this.dirty == false) {
               //this.store.dispatch(new SetPageConfirmExit());
               this.dirty = true;
            }
         })
      }
   }

   validate(values: any) { }
}