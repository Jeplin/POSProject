import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavmenuPage } from '../navmenu/navmenu';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private floorCount:FloorCountProvider) {
    this.mainDisplayMethod();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  mainDisplayMethod(){
    this.isShowPassword=true;
  }

  passwordShow(){
    console.log("Div clicked");
    if(this.isShowPassword){
      console.log("CheckBox Clicked :",this.isShowPassword);
      this.isShowPassword=false;
    }
    else{
      console.log("CheckBox Clicked :",this.isShowPassword);
      this.isShowPassword=true;
    }
  }

  loginMethod(){
    this.floorCount.setFloorCount(1);
    this.navCtrl.setRoot(NavmenuPage);
  }

}
