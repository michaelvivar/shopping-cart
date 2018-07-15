import { Injectable } from '@angular/core';
import { SettingsService } from '~/services/settings/settings.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ColorsResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.allColorsAsync((filterActive == true) ? true : false);
   }
}

@Injectable({ providedIn: 'root' })
export class ColorResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.getColor(route.paramMap.get('id'));
   }
}

@Injectable({ providedIn: 'root' })
export class SizesResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const filterActive = route.data['filterActive'];
      return this.service.allSizesAsync((filterActive == true) ? true : false);
   }
}

@Injectable({ providedIn: 'root' })
export class SizeResolver {

   constructor(private service: SettingsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.getSize(route.paramMap.get('id'));
   }
}