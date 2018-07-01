import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RemoveAppUser } from './../../store/actions/app.actions';

@Directive({
  selector: '[logout]'
})
export class LogoutDirective {

  constructor(private store: Store, private router: Router) { }

  @HostListener('click') signout() {
    this.store.dispatch(new RemoveAppUser());
    this.router.navigate(['/']);
  }

}