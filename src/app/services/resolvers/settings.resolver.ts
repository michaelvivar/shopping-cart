import { Injectable } from '@angular/core';
import { SettingsService } from '~/services/settings/settings.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ColorsResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.allColors((filterActive == true) ? true : false).pipe(take(1));
   }
}

@Injectable({ providedIn: 'root' })
export class ColorResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.getColorAsync(route.paramMap.get('id'));
   }
}

@Injectable({ providedIn: 'root' })
export class SizesResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.allSizes((filterActive == true) ? true : false).pipe(take(1))
   }
}

@Injectable({ providedIn: 'root' })
export class SizeResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.getSizeAsync(route.paramMap.get('id'));
   }
}