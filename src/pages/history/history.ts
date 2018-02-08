import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order="today";

    this.filterAllOrder();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  filterAllOrder(){

    this.dailyArray=[];
        // let strDate1:string='2018-02-07T11:40:23';
<<<<<<< HEAD
        let todaysDate=moment().format('YYYY-MM-DDTHH:mm:ss');
        let strDate2:string='2018-02-07T12:30:00';
        //console.log("Date 1 :",todaysDate,strDate2);
=======

        let todaysDate=moment().format('YYYY-MM-DDTHH:mm:ss');
        let strDate2:string='2018-02-07T12:30:00';
        //console.log("Date 1 :",todaysDate,strDate2);

>>>>>>> 115726a94089d2bbc858c92f4d9a72d6ac718a8e
        let date1:any=new Date(todaysDate);
        let date2:any=new Date(strDate2);
        let time = date1 - date2;  //msec
        let totSec=time/1000; //sec
        let hoursDiff:number = totSec / (3600); //hours
        //totSec=totSec%3600;
        //let minDiff:number=totSec/60; //Min
        //let Min=Math.trunc(minDiff);
        let Hours=Math.trunc(hoursDiff);
        let DaysDiff=Hours/24;
        let Days=Math.trunc(DaysDiff);

        console.log(Days,Hours);
        if(Days==0){
          this.dailyArray.push();
        }else if(Days<7){
          this.weeklyArray.push();
        }
        else if(Days<31){
          this.monthlyArray.push();
        }

  }

}
