import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApidataProvider } from '../../../providers/apidata/apidata';

/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  orderData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private menuData:ApidataProvider) {
    
     console.log("Cust Name : ",this.navParams.get('floorNo'));
    console.log("Data Order : ",this.navParams.get('order'));

    this.orderData=this.navParams.get('order');


  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  okayDismiss() {
    let data={floorNo:this.navParams.get('floorNo'),tableNo:this.navParams.get('tableNo'),tableId:this.navParams.get('tableId'),customerName:this.navParams.get('customerName'),order:this.navParams.get('order')};

    this.menuData.postOrderedMenu(data).subscribe(data=>{
      console.log("On Success -- cnfrm",data);

      // this.refreshAll();
      // this.getOrderedMenu();
      // this.isConfirm=false;
      this.viewCtrl.dismiss('okay');

    },error=>{
      console.log("Server Error");
    });    
  }

  cancelDismiss(){
    this.viewCtrl.dismiss('');
  }

}
