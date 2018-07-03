import { ControlValueAccessor } from '@angular/forms';

export abstract class FileInputControlValueAccessor implements ControlValueAccessor {
   //The internal data model
   private _value: any = '';

   //Placeholders for the callbacks
   private _onTouchedCallback: () => void = () => { };

   private _onChangeCallback: (_: any) => void = () => { };

   //get accessor
   get value(): any { return this._value; };

   //set accessor including call the onchange callback
   set value(v: any) {
      if (v !== this._value) {
         this._value = v;
         this._onChangeCallback(v);
      }
   }

   //Set touched on blur
   onTouched() {
      this._onTouchedCallback();
   }

   //From ControlValueAccessor interface
   writeValue(value: any) {
      this._value = value;
   }

   //From ControlValueAccessor interface
   registerOnChange(fn: any) {
      this._onChangeCallback = fn;
   }

   //From ControlValueAccessor interface
   registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
   }
}