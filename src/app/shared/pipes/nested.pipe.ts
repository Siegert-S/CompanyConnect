import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nested',
  standalone: true
})
export class NestedPipe implements PipeTransform {

  transform(object: any, path: string): any {
    return path.split('.').reduce((acc, path) => acc && acc[path], object);
  }

}
