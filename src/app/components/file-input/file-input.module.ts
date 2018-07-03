import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileInputComponent } from './file-input.component';
import { FileInputDirective } from './file-input.directive';

import { MatButtonModule } from '@angular/material';

@NgModule({
   imports: [FormsModule, ReactiveFormsModule, MatButtonModule],
   exports: [FileInputComponent],
   declarations: [FileInputComponent, FileInputDirective]
})
export class FileInputModule {

}