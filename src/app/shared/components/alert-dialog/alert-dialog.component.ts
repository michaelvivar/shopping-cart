import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
   templateUrl: './alert-dialog.template.html'
})
export class AlertDialog {
   constructor(public dialogRef: MatDialogRef<AlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}