import { MatDialog } from '@angular/material';
import { Subscription } from "rxjs";
import { Store } from '@ngxs/store';
import { PageTitle } from '~/store/actions/page.actions';
import { ServiceLocator } from './service-locator';
import { safeHtml } from './html-helper';
import { AlertDialog } from '../components/alert-dialog/alert-dialog.component';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog.component';

export abstract class BaseComponent {
   constructor() {
      this.store = ServiceLocator.injector.get(Store);
      this.dialog = ServiceLocator.injector.get(MatDialog);
      //this.location = ServiceLocator.injector.get(Location);
   }
   protected store: Store;
   protected dialog: MatDialog;
   protected location: Location;
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
}

export abstract class Page extends BaseComponent {

   set title(value: string) {
      this.store.dispatch(new PageTitle(value));
   }

   ngOnDestroy() {
      this.store.dispatch(new PageTitle(null));
      super.ngOnDestroy();
   }
}