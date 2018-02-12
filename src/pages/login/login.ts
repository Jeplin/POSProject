import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { NavmenuPage } from '../navmenu/navmenu';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';

import { Network } from '@ionic-native/network';
import { HistoryPage } from '../history/history';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LogViewPage } from './log-view/log-view';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private floorCount:FloorCountProvider,private network: Network,private alertCtrl:AlertController,private modalCtrl:ModalController,private storage:Storage) {
     
    storage.get('userId').then((val)=>{
      console.log("Check :",val);
      if(val!=null){
        console.log("Check is :",val);
        this.floorCount.setFloorCount(1);
        this.navCtrl.setRoot(NavmenuPage);
      }
      else{
        let modalConfirm=this.modalCtrl.create(LogViewPage,null,{cssClass:'inset-modal'});
          modalConfirm.onDidDismiss(data=>{
            console.log(data);
          });
        modalConfirm.present();
      }
    });
    //this.mainDisplayMethod();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
