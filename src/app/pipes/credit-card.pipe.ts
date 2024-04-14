import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
  standalone: true
})
export class CreditCardPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string){
    let newCredit = [];
    for(let i = 0; i < value.length; i+=4)
      {
        newCredit.push(value.slice(i, i + 4));
      }
    return newCredit.join('-');
    }
  }
