import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { FormBaseComponent } from '~utils/form-base.component';
import { UserService } from '~services/user.service';

@Component({
   selector: 'login-form',
   templateUrl: './login-form.template.html',
})
export class LoginFormComponent extends FormBaseComponent {

   constructor(private service: UserService, private router: Router) { super() }

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