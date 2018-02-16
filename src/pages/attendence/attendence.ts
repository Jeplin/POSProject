import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import * as moment from 'moment';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the AttendencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendence',
  templateUrl: 'attendence.html',
})
export class AttendencePage {

  attendenceData:any;
  totTime:any;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private attendence:ApidataProvider,private storage:Storage,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {

    
    this.localStorage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendencePage');
    
  }
  localStorage(){
    //this.showLoader();
    this.storage.get('userId').then((val)=>{
      console.log(val);
      this.getUserAttendence(val);
    });
    
  }

  getUserAttendence(userid){
    this.totTime=[];

    let data={'userId':userid};
    this.attendence.getUserAttendance(data).subscribe(data=>{
      if(data!=""){
        this.attendenceData=data[0];
        console.log("Attendence :",this.attendenceData);

        //this.loading.dismiss();

        this.attendenceData.forEach(element => {
          console.log("Sign in ",element['id']);

          let strDate1=element['in_time'];
          let strDate2=element['out_time'];
          console.log(strDate1);
          console.log(strDate2);

          if(strDate1==""){
            let totTimeStr:string="";
            this.totTime.push(totTimeStr);
          }
          else if(strDate2==''){
            let totTimeStr:string="";
            this.totTime.push(totTimeStr);
          }
          else{
            let strDate1Rep=strDate1.replace(/-/g,'/');
            let strDate2Rep=strDate2.replace(/-/g,'/');
            let date1=new Date(strDate1Rep);
            console.log(date1);
            let date2=new Date(strDate2Rep);
            console.log(date2);
            let time = date2.getTime() - date1.getTime();  //msec

            let totSec=time/1000; //sec
            let hoursDiff:number = totSec / (3600); //hours
            totSec=totSec%3600;
            let minDiff:number=totSec/60; //Min
  
            let Min=Math.trunc(minDiff);
            let Hours=Math.trunc(hoursDiff);
  
            if (Min>59){
              Hours=Hours+1;
              Min=Min-60;
            }
            let strHours:string=''+Hours;
            let strMin:string=''+Min;
  
            if(Hours==0){
              strHours='00';
            }
            else if(Hours<10){
              strHours='0'+Hours;
            }
            if(Min==0){
              strMin='00';
            }
            else if(Min<10){
              strMin='0'+Min;
            }
  
            let totTimeStr:string=strHours+':'+strMin;
            this.totTime.push(totTimeStr);
  
            console.log("Test ",Hours,Min,totTimeStr);
          }
        });
        //console.log("Attendence :",this.attendenceData);
      }
      else{
        //this.loading.dismiss();
        this.showAlert("Error!","Unable to load data...");
        
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
            this.localStorage();
            console.log('Agree clicked');
          }
        }
      ]
    });
    alert.present();
  }


}
