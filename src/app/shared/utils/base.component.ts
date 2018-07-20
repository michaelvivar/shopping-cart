import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from "rxjs";
import { Store } from '@ngxs/store';
import { PageTitle, ResetButtons, AddButton, BackButton } from '~/store/actions/page.actions';
import { ServiceLocator } from './service-locator';
import { safeHtml } from './html-helper';
import { AlertDialog } from '../components/alert-dialog/alert-dialog.component';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog.component';

export abstract class BaseComponent {
   constructor(private _asPage = false) {
      this.store = ServiceLocator.injector.get(Store);
      this.dialog = ServiceLocator.injector.get(MatDialog);
      this.snackBar = ServiceLocator.injector.get(MatSnackBar);
      //this.location = ServiceLocator.injector.get(Location);
   }
   protected store: Store;
   protected dialog: MatDialog;
   private snackBar: MatSnackBar;
   protected location: Location;
   private subscriptions: Subscription[] = [];

   set subscription(value: Subscription) {
      this.subscriptions.push(value);
   }

   ngOnDestroy() {
      if (this._asPage) {
         this.store.dispatch(new PageTitle(null));
         this.store.dispatch(new ResetButtons());
      }
      this.subscriptions.forEach(o => o.unsubscribe());
      console.log('Destroyed!', this.subscriptions.length);
   }

   alert(message: string, dialog?: { title?: string, ok?: string, width?: number }) {
      message = <any>safeHtml(message);
      dialog = dialog || {};
      dialog.width = dialog.width || 400;
      if (this.dialog) {
         let dialogRef = this.dialog.open(AlertDialog, {
            width: dialog.width + 'px',
            data: { message, dialog }
         });
         return dialogRef.afterClosed().toPromise();
      }
   }

   confirm(message: string, dialog?: { title?: string, cancel?: string, confirm?: string, width?: number }): Promise<boolean> {
      message = <any>safeHtml(message);
      dialog = dialog || {};
      dialog.width = dialog.width || 400;
      if (this.dialog) {
         let dialogRef = this.dialog.open(ConfirmDialog, {
            width: dialog.width + 'px',
            data: { message, dialog }
         });
         return dialogRef.afterClosed().toPromise();
      }
   }

   openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 2000,
      });
   }

   set title(value: string) {
      if (this._asPage) {
         this.store.dispatch(new PageTitle(value));
      }
   }

   addButton(link: string) {
      this.store.dispatch(new AddButton({ link }));
   }

   backButton(link: string) {
      this.store.dispatch(new BackButton({ link }));
   }
}

export abstract class Page extends BaseComponent {

   constructor() {
      super(true);
   }
}