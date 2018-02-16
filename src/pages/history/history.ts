import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  order: string;
  dailyArray:any;
  weeklyArray:any;
  monthlyArray:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private apiCall:ApidataProvider,private storage:Storage,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
    this.order="today";

    
    this.localStorage();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  localStorage(){
    //this.showLoader();
    this.storage.get('userId').then((val)=>{
      console.log(val);
      this.getHistoryData(val);
    });
    
  }

  getHistoryData(val){

    let data={
      userId:val
    };
    this.apiCall.getHistoryData(data).subscribe(data=>{
      //console.log("His :",data);
      if(data!=""){
        //this.loading.dismiss();
        this.dailyArray=[];
        this.weeklyArray=[];
        this.monthlyArray=[];
        let allData:any=data;
        allData.forEach(element => {
          this.filterAllOrder(element);
          console.log("Ele :",element);
        });
      }
      else{
        //this.loading.dismiss();
        this.showAlert("Oops Error!","Unable to fetch history data...");
        
      }
    },err=>{
      //this.loading.dismiss();
      console.log("my error :");
      this.showAlert("Server Error!","Please check your connect and try again..");
     
    });
  }

  filterAllOrder(data){
          let todaysDate:string=moment().format('YYYY/MM/DD HH:mm:ss');
          let strDate:string=data['modified_date'];
          let modDate:string=strDate.replace(/-/g,'/');
          // let todaysDate:string="2018/02/1 15:30:00";
          // let modDate="2018/01/30 13:32:12";
          console.log("Ele :",todaysDate,modDate,data);
          let date1=new Date(todaysDate);
          let date2=new Date(modDate);

          let diff=date1.valueOf()-date2.valueOf();

          let totSec=diff/1000;

          let totHr=totSec/3600;

          let Days=totHr/24;
          Days=Math.trunc(Days);

        if(Days==0){
          this.dailyArray.push(data);
        }else if(Days<7){
          this.weeklyArray.push(data);
        }
        else if(Days<31){
          this.monthlyArray.push(data);
        }

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
            this.localStorage();
            console.log('Agree clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
