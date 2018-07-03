import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatDividerModule } from "@angular/material";
import { LoginFormComponent } from "./login-form.component";

@NgModule({
   imports: [
      CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatDividerModule,
      MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule
   ],
   exports: [LoginFormComponent],
   declarations: [LoginFormComponent]
})
export class LoginFormModule { }