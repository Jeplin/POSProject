import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';

/**
 * Generated class for the OrdermenuCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordermenu-card',
  templateUrl: 'ordermenu-card.html',
})
export class OrdermenuCardPage {

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

  itemClicked(index){
    console.log("Item Clicked",index);
    this.isChecked=true;
  }

}
