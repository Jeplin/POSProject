import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { NavmenuPage } from '../navmenu/navmenu';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';

import { Network } from '@ionic-native/network';
import { HistoryPage } from '../history/history';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LogViewPage } from './log-view/log-view';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  showPasswordFlag:boolean;
  isShowPassword:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private floorCount:FloorCountProvider,private network: Network,private alertCtrl:AlertController,private modalCtrl:ModalController) {
    
    //this.mainDisplayMethod();
  }

  ionViewDidLoad() {

    let modalConfirm=this.modalCtrl.create(LogViewPage,null,{cssClass:'inset-modal'});
      modalConfirm.onDidDismiss(data=>{
        console.log(data);
      });
    modalConfirm.present();

    console.log('ionViewDidLoad LoginPage');

    // this.network.onConnect().subscribe(data => {
    //   console.log("Connected",data)
    // }, error => console.error("ConErr",error));
   
    // this.network.onDisconnect().subscribe(data => {
    //   console.log("No Connect",data)
    //   this.showAlert();
    // }, error => console.error(error));

  }

  // mainDisplayMethod(){
  //   this.isShowPassword=true;
  // }

  // passwordShow(){
  //   console.log("Div clicked");
  //   if(this.isShowPassword){
  //     console.log("CheckBox Clicked :",this.isShowPassword);
  //     this.isShowPassword=false;
  //   }
  //   else{
  //     console.log("CheckBox Clicked :",this.isShowPassword);
  //     this.isShowPassword=true;
  //   }
  // }

  // loginMethod(){
  //   let modalConfirm=this.modalCtrl.create(LogViewPage,null,{cssClass:'inset-modal'});
  //     modalConfirm.onDidDismiss(data=>{
  //       console.log(data);
  //     });
  //   modalConfirm.present();

  //   // this.floorCount.setFloorCount(1);
  //   // this.navCtrl.setRoot(NavmenuPage);
  //   //this.navCtrl.setRoot(HistoryPage);
  // }

  // showAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Connection Error!',
  //     subTitle: 'No internet connection available',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

}
