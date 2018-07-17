import { Injectable } from '@angular/core';
import { Option } from '~/services/models/option.model';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {
   allColors(filterActive = true): Observable<Option[]> {
      return <any>[];
   }

   insertColor(color: Option): Promise<string> {
      return null;
   }

   updateColor(id: any, color: Option | { status: boolean }): Promise<void> {
      return null;
   }

   getColorAsync(id: any): Promise<Option> {
      return null;
   }

   allSizes(filterActive = true): Observable<Option[]> {
      return <any>[];
   }

   insertSize(color: Option): Promise<string> {
      return null;
   }

   updateSize(id: any, color: Option | { status: boolean }): Promise<void> {
      return null;
   }

   getSizeAsync(id: any): Promise<Option> {
      return null;
   }
}