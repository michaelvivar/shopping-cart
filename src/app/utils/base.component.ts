import { ServiceLocator } from './service-locator';
import { Subscription } from "rxjs";
import { Store } from "@ngxs/store";
import { MatDialog } from '@angular/material';
import { Location } from "@angular/common";
import { safeHtml } from './html-helper';
import { AlertDialog } from './../shared/components/alert-dialog/alert-dialog.component';
import { ConfirmDialog } from './../shared/components/confirm-dialog/confirm-dialog.component';

export class BaseComponent {
  constructor() {
    this.dialog = ServiceLocator.injector.get(MatDialog);
    this.store = ServiceLocator.injector.get(Store);
    this.location = ServiceLocator.injector.get(Location);
  }

  protected store: Store;
  protected dialog: MatDialog;
  protected location: Location;

  protected title: string;
  private subscriptions: Subscription[] = [];

  set subscription(value: Subscription) {
    this.subscriptions.push(value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(o => o.unsubscribe());
    console.log('Destroyed!', this.subscriptions.length);
  }

  alert(message: string, title?: string) {
    message = <any>safeHtml(message);
    if (this.dialog) {
      let dialogRef = this.dialog.open(AlertDialog, {
        width: '300px',
        data: { message, title }
      });

      return dialogRef.afterClosed().toPromise();
    }
  }

  confirm(message: string, title?: string): Promise<boolean> {
    message = <any>safeHtml(message);
    if (this.dialog) {
      let dialogRef = this.dialog.open(ConfirmDialog, {
        width: '400px',
        data: { message, title }
      });

      return dialogRef.afterClosed().toPromise();
    }
  }

  back() {
    this.location.back();
  }
}