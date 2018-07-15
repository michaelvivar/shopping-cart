import { Injectable } from '@angular/core';
import { Option } from '~/services/models/option.model';

@Injectable()
export class SettingsService {
   allColorsAsync(filterActive = true): Promise<Option[]> {
      return <any>[];
   }

   insertColor(color: Option): Promise<string> {
      return null;
   }

   updateColor(id: any, color: Option | { status: boolean }): Promise<void> {
      return null;
   }

   getColor(id: any): Promise<Option> {
      return null;
   }

   allSizesAsync(filterActive = true): Promise<Option[]> {
      return <any>[];
   }

   insertSize(color: Option): Promise<string> {
      return null;
   }

   updateSize(id: any, color: Option | { status: boolean }): Promise<void> {
      return null;
   }

   getSize(id: any): Promise<Option> {
      return null;
   }
}