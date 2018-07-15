import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
   selector: 'app-alert',
   templateUrl: './confirm-dialog.template.html',
   styles: []
})
export class ConfirmDialog {

   constructor(public dialogRef: MatDialogRef<ConfirmDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
      data.dialog = data.dialog || {};
      data.dialog.cancel = data.dialog.cancel || 'Cancel';
      data.dialog.confirm = data.dialog.confirm || 'Confirm';
   }
}