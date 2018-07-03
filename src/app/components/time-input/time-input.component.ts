import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeInputControlValueAccessor } from './time-input.base';

@Component({
   selector: 'time-input',
   templateUrl: './time-input.template.html',
   styles: [
      '.mat-form-field { display: inline-block; width: 30px }',
      '.mat-form-field input { text-align: center }',
      '.mat-raised-button { line-height: 30px; min-width: 50px }'
   ],
   providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
   }]
})
export class TimeInputComponent extends TimeInputControlValueAccessor {

   constructor(private formbuilder: FormBuilder) { super() }

   subscription: Subscription

   ngOnInit() {
      this.form = this.formbuilder.group({
         time: this.formbuilder.group({
            hour: new FormControl(0),
            minute: new FormControl(0),
            meridian: new FormControl('AM')
         })
      });
      this.onChanges();
   }

   onChanges() {
      this.subscription = this.time.valueChanges.subscribe(value => {
         if (value.meridian == 'PM' && value.hour != 12) {
            value.hour += 12;
         }
         if (value.meridian == 'AM' && value.hour == 12) {
            value.hour = 0;
            this.subscription.unsubscribe();
            this.time.get('hour').setValue('00');
            this.onChanges();
         }
         this.onChange.emit({ hour: value.hour, minute: value.minute });
         this.value = { hour: value.hour, minute: value.minute };
      });
   }

   setValue(value: any) {
      if (value.hour && value.hour >= 12) {
         value.meridian = 'PM';
         if (value.hour > 12) {
            value.hour -= 12;
         }
      }
      this.time.setValue(value);
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

   @Input('color') color: string = 'primary';
   @Output('change') onChange = new EventEmitter();

   form: FormGroup;
   hour: number;

   toggleTimeMeridian() {
      this.time.get('meridian').setValue(this.meridian == 'AM' ? 'PM' : 'AM');
   }

   get time() {
      return this.form.get('time') as FormGroup;
   }

   get meridian() {
      return this.time.get('meridian').value;
   }
}