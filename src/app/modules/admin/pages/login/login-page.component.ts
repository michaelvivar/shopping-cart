import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Form } from '~/shared';
import { PageTitle } from '~/store/actions/page.actions';

@Component({
   templateUrl: './login-page.template.html'
})
export class LoginPage extends Form {
   constructor(
      @Inject('LOGIN_SERVICE') private service,
      private router: Router
   ) { super(true) }

   ngOnInit() {
      this.title = 'Log In';
      this.form = this.formbuilder.group({
         username: new FormControl(null, [Validators.required]),
         password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
   }

   submit() {
      this.service.login(this.form.get('username').value, this.form.get('password').value).then(() => {
         this.router.navigate(['/admin']);
      })
   }
}