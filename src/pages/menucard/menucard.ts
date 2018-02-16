import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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

  loading:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuData:ApidataProvider,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
    this.getMenuData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenucardPage');
    this.getMenuData();
  }

  getMenuData(){
    //this.showLoader();
    this.menuData.getMenuData().subscribe(data =>{
      console.log("Menu List : "+data);
      if(data!=""){
        //this.loading.dismiss();
        this.menuList=data;
      }
      else{
        //this.loading.dismiss();
        this.showAlert("Oops!","Unable to load data..");
        //this.getMenuData();
      }
      
    },err=>{
      //this.loading.dismiss();
      console.log("my error :");
      this.showAlert("Server Error!","Please check your connect and try again..");
      
    });
  }

   showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
  }

  showAlert(title,message){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Reload',
          handler: () => {
            this.getMenuData();
            console.log('Agree clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
