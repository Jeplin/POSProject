import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { MenucardPage } from '../menucard/menucard';

import { ProfilePage } from '../profile/profile';
import { AttendencePage } from '../attendence/attendence';
import { Home1Page } from '../home1/home1';
import { LoginPage } from '../login/login';
import { TablePage } from '../table/table';
import { OrdermenuCardPage } from '../ordermenu-card/ordermenu-card';
import { MembershipPage } from '../membership/membership';
import { HistoryPage } from '../history/history';
import { Storage } from '@ionic/storage';
//import { ProfiletabPage } from '../profiletab/profiletab';

import * as moment from 'moment';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


/**
 * Generated class for the NavmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navmenu',
  templateUrl: 'navmenu.html',
})
export class NavmenuPage {
  @ViewChild(Nav) nav: Nav;
  
    user="";
    UserId="";
    rootPage: any = Home1Page;
  
    pages: Array<{title: string, component: any, icon:any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,private apiCall:ApidataProvider,private alertCtrl:AlertController) {

    storage.get('username').then((val)=>{
      this.user=val;
      console.log("user:",val);
    });

    storage.get('userId').then((val)=>{
      this.UserId=val;
    });

    this.pages = [
      { title: 'Tables', component: Home1Page , icon:"help-buoy" },
      { title: 'Menu Card', component: MenucardPage ,icon:"paper" },
      { title: 'Attendence' , component:AttendencePage ,icon:"list-box" },
      { title: 'History' , component:HistoryPage ,icon:"stats" },
      { title: 'MemberShip' , component:MembershipPage ,icon:"people" }
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavmenuPage');
  }

  openPage(page) {
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  profileClicked(){
    this.nav.setRoot(ProfilePage);
  }

  logoutMethod(){

    this.storage.get('attId').then((val)=>{
      console.log(val);
      this.setUserAttendance(val);
    });
  }

  setUserAttendance(attId){
    let todaysDate=moment().format('YYYY-MM-DD HH:mm:ss');
    console.log("Todays :",todaysDate);
    let data={
      userId:this.UserId,
      inTime:'',
      outTime:todaysDate,
      att_id:attId
    }
     this.apiCall.setAttendance(data).subscribe(data=>{
       console.log(data);
       if(data["status"]==true){
        this.showAlert("Logout Successfully!","");
        this.storage.clear();
    
        this.navCtrl.setRoot(LoginPage);
       }
       //this.storage.set('attId',data['message']);
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
