import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeInputComponent } from './time-input.component';
import { TimeInputDirective } from './time-input.directive';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
   imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
   exports: [TimeInputComponent],
   declarations: [TimeInputComponent, TimeInputDirective],
})
export class TimeInputModule {

}