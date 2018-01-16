
import { Injectable } from '@angular/core';

/*
  Generated class for the TableDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TableDetailsProvider {

  tableDetails:any;

  constructor() {
    console.log('Hello TableDetailsProvider Provider');
  }

  getTableDetails(){
    return this.tableDetails;
  }

  setTableDetails(data){
    this.tableDetails=data;
  }


}
