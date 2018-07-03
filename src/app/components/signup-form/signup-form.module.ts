import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SignupFormComponent } from "./signup-form.component";
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule } from "@angular/material";

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
      MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule
   ],
   exports: [SignupFormComponent],
   declarations: [SignupFormComponent]
})
export class SignupFormModule { }