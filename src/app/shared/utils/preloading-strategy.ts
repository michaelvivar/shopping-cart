import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

export class ModulePreloadingStrategy implements PreloadingStrategy {

   preload(route: Route, fn: () => Observable<any>): Observable<any> {
      if (route.data && route.data.preload == false) {
         return of(null);
      }
      else {
         return fn().pipe(map(o => o), delay(5000));
      }
   }
}