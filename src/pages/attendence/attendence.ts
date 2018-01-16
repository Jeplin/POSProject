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

  constructor(public navCtrl: NavController, public navParams: NavParams,private attendence:ApidataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendencePage');
    this.getUserAttendence();
  }

  getUserAttendence(){
    this.attendence.getProfileData().subscribe(data=>{
        this.attendenceData=data[0]["attendence"];
        console.log("Attendence :",this.attendenceData);
    })
  }

}
