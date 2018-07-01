import { Pipe, PipeTransform } from '@angular/core';
import { sortBy } from '~utils/array-helper';

@Pipe({
   name: 'sort'
})
export class SortPipe implements PipeTransform {

   transform(value: any[], ...args: string[]): any {
      if (value && value.length > 0 && args && args.length > 0) {
         return value.sort(sortBy(...args));
      }
      return value;
   }
}