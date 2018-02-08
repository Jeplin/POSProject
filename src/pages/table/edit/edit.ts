import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { OrdermenuProvider } from '../../../providers/ordermenu/ordermenu';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  itemName:string;
  itemPrice:string;
  itemQuant=0;
  index=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private orderMenu:OrdermenuProvider) {
    console.log("item name :",this.navParams.get('itemName'));
    console.log("item name :",this.navParams.get('itemPrice'));
    console.log("item name :",this.navParams.get('itemQuant'));
    console.log("item name :",this.navParams.get('index'));

    this.itemName=this.navParams.get('itemName');
    this.itemPrice=this.navParams.get('itemPrice');
    this.itemQuant=this.navParams.get('itemQuant');
    this.index=this.navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  increaseClicked(){
    this.itemQuant=this.itemQuant+1;
  }
  decreaseClicked(){
    if(this.itemQuant>1){
      this.itemQuant=this.itemQuant-1;
    }
  }

  okayDismiss() {
    this.orderMenu.updateOrderMenu(this.itemName,this.itemPrice,this.itemQuant,this.index);
    this.viewCtrl.dismiss('Okay');
  }
  removeDismiss(){
    this.orderMenu.removeMenuItem(this.index);
    this.viewCtrl.dismiss('Remove');
  }
  cancelDismiss(){
    this.viewCtrl.dismiss('Cancel');
  }

}
