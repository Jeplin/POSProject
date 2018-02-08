import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the CustnamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custname',
  templateUrl: 'custname.html',
})
export class CustnamePage {

  customerName:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustnamePage');
  }

  okayDismiss() {
    let custName=this.customerName;
    if(custName==null || custName == ''){
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Empty Feild Not Allowed!',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.viewCtrl.dismiss(custName);
    }
  }

  cancelDismiss(){
    this.viewCtrl.dismiss('');
  }

}
