import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuData:ApidataProvider,private alertCtrl:AlertController) {
    this.getMenuData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenucardPage');
    this.getMenuData();
  }

  getMenuData(){
    this.menuData.getMenuData().subscribe(data =>{
      console.log("Menu List : "+data);
      if(data!=""){
        this.menuList=data;
      }
      else{
        this.showAlert("Oops!","Unable to load data..");
        this.getMenuData();
      }
      
    },err=>{
      console.log("my error :");
      this.showAlert("Server Error!","Please check your connect and try again..");
      
    });
  }

  showAlert(title,message){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
