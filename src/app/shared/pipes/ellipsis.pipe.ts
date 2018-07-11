import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

   transform(value: string, max: number): any {
      if (value && value.length > max) {
         return value.substr(0, max) + '...';
      }
      return value;
   }
}