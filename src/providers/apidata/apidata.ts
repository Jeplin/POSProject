import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the ApidataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApidataProvider {

  
  //apiURL:string="http://10.0.2.2:80/POSProjects/";
  apiURL:string="http://localhost:80/POSProjects/";

  constructor(public http: HttpClient) {
    console.log('Hello ApidataProvider Provider');
  }

  getLayoutData(){
    return this.http.get(this.apiURL+"getLayout.php").do(res =>console.log(res));
  }

  getMenuData(){
    return this.http.get(this.apiURL+"getMenuData.php").do(res =>console.log(res));
  }

  getProfileData(){
    return this.http.get(this.apiURL+"getUserData.php").do(res=>console.log(res));
  }

  postOrderedMenu(data){
    return this.http.post(this.apiURL+"addTableOrders.php",data,{
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).do(res=>console.log(res));
  }

  getOrderedData(data){
    return this.http.post(this.apiURL+"getOrderedData.php",data,{
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).do(res=>console.log(res));
  }

  updateTableStatus(data){
    return this.http.post(this.apiURL+"updateTableStatus.php",data,{
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    }).do(res=>console.log(res));
  }


}
