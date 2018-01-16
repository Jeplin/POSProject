import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';

/**
 * Generated class for the MenucardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menucard',
  templateUrl: 'menucard.html',
})
export class MenucardPage {
  menuList:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuData:ApidataProvider) {
    this.getMenuData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenucardPage');
    this.getMenuData();
  }

  getMenuData(){
    this.menuData.getMenuData().subscribe(data =>{
      console.log("Menu List : "+data);
      this.menuList=data;
    });
  }

}
