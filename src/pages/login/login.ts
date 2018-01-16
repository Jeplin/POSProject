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

  constructor(public navCtrl: NavController, public navParams: NavParams,private floorCount:FloorCountProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginMethod(){
    this.floorCount.setFloorCount(1);
    this.navCtrl.setRoot(NavmenuPage);
  }

}
