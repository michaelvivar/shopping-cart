import { Subscription } from "rxjs";

export abstract class BaseDirective {

   private subscriptions: Subscription[] = [];

   set subscription(value: Subscription) {
      this.subscriptions.push(value);
   }

   ngOnDestroy() {
      this.subscriptions.forEach(o => o.unsubscribe());
   }
}