import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markSearch'
})
export class MarkSearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {return value;}
    var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    const mark= value.replace(re, "<mark>$&</mark>");
    return  mark;
}

}
