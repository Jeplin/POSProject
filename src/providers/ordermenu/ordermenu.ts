
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

  addOrderMenu(name,price,quant){
      
      let item={'itemName':name,'itemPrice':price,'quant':quant};
      this.orderMenu.push(item);
  }

  updateOrderMenu(name,price,quant,index){

      console.log("Update :",this.orderMenu[index]);
      let totPrice=price*quant;
      this.orderMenu[index].itemPrice=totPrice;
      this.orderMenu[index].quant=quant;
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
