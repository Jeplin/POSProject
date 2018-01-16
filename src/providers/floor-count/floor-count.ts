
import { Injectable } from '@angular/core';

/*
  Generated class for the FloorCountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FloorCountProvider {
  floorCount: number;

  tableCount:number;

  constructor() {
    console.log('Hello FloorCountProvider Provider');
  }

  getFloorCount(){
    return this.floorCount;
  }

  setFloorCount(count){
    this.floorCount=count;
  }

  getTableCount(){
    return this.tableCount;
  }

  setTableCount(num){
    this.tableCount=num;
  }

}
