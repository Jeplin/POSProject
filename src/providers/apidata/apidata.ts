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

  header={
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  };

  constructor(public http: HttpClient) {
    console.log('Hello ApidataProvider Provider');
  }

  getLoginData(data){
    return this.http.post(this.apiURL+"getLogin.php",data,this.header).do(res=>console.log(res));
  }

  setAttendance(data){
    return this.http.post(this.apiURL+"setAttendance.php",data,this.header).do(res=>console.log(res));
  }

  getLayoutData(){
    return this.http.get(this.apiURL+"getLayout.php").do(res =>console.log(res));
  }

  getMenuData(){
    return this.http.get(this.apiURL+"getMenuData.php").do(res =>console.log(res));
  }

  getProfileData(data){
    console.log("Profile :",data);
    return this.http.post(this.apiURL+"getUserData.php",data,this.header).do(res=>console.log(res));
  }

  getHistoryData(data){
    return this.http.post(this.apiURL+"getHistory.php",data,this.header).do(res=>console.log(res));
  }

  updateProfileData(data){
    console.log("Profile :",data);
    return this.http.post(this.apiURL+'updateUserDetail.php',data,this.header).do(res=>console.log(res));
  }

  postOrderedMenu(data){
    return this.http.post(this.apiURL+"addTableOrders.php",data,this.header).do(res=>console.log(res));
  }

  getOrderedData(data){
    return this.http.post(this.apiURL+"getOrderedData.php",data,this.header).do(res=>console.log(res));
  }

  updateTableStatus(data){
    return this.http.post(this.apiURL+"updateTableStatus.php",data,this.header).do(res=>console.log(res));
  }

  getUserAttendance(data){
    return this.http.post(this.apiURL+"getUserAttendance.php",data,this.header).do(res=>console.log(res));
  }


}
