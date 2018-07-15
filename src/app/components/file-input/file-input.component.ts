import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileInputControlValueAccessor } from './file-input.base';

@Component({
   selector: 'file-input',
   templateUrl: './file-input.template.html',
   styles: [
      'input { display: none }'
   ],
   providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true
   }]
})
export class FileInputComponent extends FileInputControlValueAccessor {
   constructor() { super() }

   onSelect(event: any) {
      const files: FileList = event.target.files;
      const value = this.multiple ? files : files.item(0);
      this.onChange.emit(value);
      this.value = value;
   }

   @Input('multiple') multiple: boolean = false;
   @Input('color') color: string = 'primary';
   @Output('select') onChange = new EventEmitter();
}