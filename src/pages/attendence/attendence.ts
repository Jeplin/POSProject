import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private attendence:ApidataProvider) {
    
    

    this.getUserAttendence();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendencePage');
    
  }

  getUserAttendence(){
    this.totTime=[];

    this.attendence.getProfileData().subscribe(data=>{
        this.attendenceData=data[0]["attendence"];
        this.attendenceData.forEach(element => {
          console.log("Sign in ",element['id']);

          let strDate1:string=element['in_time'];
          let strDate2:string=element['out_time'];

          let date1:any=new Date(strDate1);
          let date2:any=new Date(strDate2);
          let time = date2 - date1;  //msec
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


        });
        console.log("Attendence :",this.attendenceData);
    })
  }

}
