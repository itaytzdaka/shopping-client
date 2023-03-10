import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: number): any {
    if(value % 1 === 0){
      return Math.round(value);
    }
    
    // value = Number(value);
    return  value;
}

}
