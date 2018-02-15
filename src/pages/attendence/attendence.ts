import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import * as moment from 'moment';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private attendence:ApidataProvider,private storage:Storage,private alertCtrl:AlertController) {

    this.localStorage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendencePage');
    
  }
  localStorage(){
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
        this.showAlert("Error!","Unable to load data...");
        this.localStorage();
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
