import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceLocator } from '~utils/service-locator';
import { BaseComponent } from '~utils/base.component';


export class FormBaseComponent extends BaseComponent {
   constructor() {
      super();
      this.formbuilder = ServiceLocator.injector.get(FormBuilder);
   }

   formbuilder: FormBuilder;
   form: FormGroup;
   dirty = false;

   ngAfterContentInit() {
      this.subscription = this.form.valueChanges.subscribe(data => {
         this.validate(data);
         if (this.dirty == false) {
            //this.store.dispatch(new SetPageConfirmExit());
            this.dirty = true;
         }
      })
   }

   validate(values: any) { }
}