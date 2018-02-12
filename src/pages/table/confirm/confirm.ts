import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApidataProvider } from '../../../providers/apidata/apidata';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


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

  userId="";
  orderData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private menuData:ApidataProvider,private storage:Storage,private alertCtrl:AlertController,private toastCtrl:ToastController) {
    
    console.log("Cust Name : ",this.navParams.get('floorNo'));
    console.log("Data Order : ",this.navParams.get('order'));

    this.orderData=this.navParams.get('order');

    storage.get('userId').then((val)=>{
      this.userId=val;
    });

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  okayDismiss() {

    let data={floorNo:this.navParams.get('floorNo'),tableNo:this.navParams.get('tableNo'),tableId:this.navParams.get('tableId'),customerName:this.navParams.get('customerName'),order:this.navParams.get('order'),userId:this.userId};

    this.menuData.postOrderedMenu(data).subscribe(data=>{
      console.log("On Success -- cnfrm",data);
      if(data!=""){
        this.showToast("Update Successfully");
        this.viewCtrl.dismiss('okay');
      }
      else{
        this.showToast("Update failed!");
      }
    },error=>{
      console.log("Server Error");
    });    
  }

  cancelDismiss(){
    this.viewCtrl.dismiss('');
  }

  showAlert(title,message){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
