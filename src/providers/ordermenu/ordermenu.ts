
import { Injectable } from '@angular/core';

/*
  Generated class for the OrdermenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdermenuProvider {
  orderMenu=[];


  constructor() {
    console.log('Hello OrdermenuProvider Provider');
  }

  addOrderMenu(name,price){
      let item={'itemName':name,'itemPrice':price,'quant':1};
      this.orderMenu.push(item);
  }

  getOrderedMenu(){
    return this.orderMenu;
  }

  removeMenuItem(index){

  }

  increaseQuant(quant){

  }

  decreaseQuant(quant){

  }



}
