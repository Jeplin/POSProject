import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username: string;
  name:string;
  email:string;
  contact:string;
  curraddress:string;
  perAddress:string;

  profileData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private profile:ApidataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUserProfileData();
  }

  getUserProfileData(){
    this.profile.getProfileData().subscribe(data=>{
      this.profileData=data[0]["userdetail"];

      console.log("Profile : ",this.profileData['name']);
      

      this.displayUserData();


    });
  }

  displayUserData(){
    this.username=this.profileData['username'];
    this.name=this.profileData['name'];
    this.email=this.profileData['email'];
    this.contact=this.profileData['contact'];
    this.curraddress=this.profileData['current_address'];
    this.perAddress=this.profileData['permanent_address'];
  }
}
