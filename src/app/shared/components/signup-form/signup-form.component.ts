import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Form } from '../../utils/form-base.component';

@Component({
   selector: 'signup-form',
   templateUrl: './signup-form.template.html',
})
export class SignupFormComponent extends Form {

   constructor(
      @Inject('SIGNUP_SERVICE') private service,
      private router: Router
   ) { super() }

   ngOnInit() {
      this.form = this.formbuilder.group({
         username: new FormControl(null, [Validators.required]),
         password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
         confirm: new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
   }

   submit() {
      this.service.signup(this.form.get('username').value, this.form.get('password').value).then(() => {
         this.router.navigate(['/account']);
      })
   }
}