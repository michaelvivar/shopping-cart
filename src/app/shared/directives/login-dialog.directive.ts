import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialog } from './../components/login-dialog/login-dialog.component';

@Directive({
  selector: '[loginDialog]'
})
export class LoginDialogDirective {

  constructor(private dialog: MatDialog) { }

  @HostListener('click') open() {
    this.dialog.open(LoginDialog, {
      width: '400px'
    })
  }
}