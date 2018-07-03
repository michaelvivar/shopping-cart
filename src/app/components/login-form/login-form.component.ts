import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
   selector: 'login-form',
   templateUrl: './login-form.template.html',
})
export class LoginFormComponent {

   constructor(
      @Inject('LOGIN_SERVICE') private service,
      private router: Router,
      private formbuilder: FormBuilder
   ) { }

   form: FormGroup;

   ngOnInit() {
      this.form = this.formbuilder.group({
         username: new FormControl(null, [Validators.required]),
         password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
   }

   submit() {
      this.service.login(this.form.get('username').value, this.form.get('password').value).then(() => {
         this.router.navigate(['/account']);
      })
   }
}