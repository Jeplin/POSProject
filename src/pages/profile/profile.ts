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

  user = {
    name: 'Jeplin Devbarma',
    profileImage: 'assets/imgs/1.jpg',
    coverImage: 'assets/imgs/5.jpg',
    occupation: 'Developer',
    location: 'India,IND',
    description: 'The test description to check is working.',
    followers: 456,
    following: 1052,
    posts: 35
  };

  isEdit:boolean;
  editButtontitle:string;

  countries:any;
  countrySelectCur:any;
  countrySelectPer:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private profile:ApidataProvider) {
  
    this.isEdit=false;
    this.editButtontitle="Edit";
    this.countrySelectPer="India";
    this.countrySelectCur="India";
    this.countries=["Afghanistan",
    "Argentina",
    "Australia",
    "Bangladesh",
    "Belgium",
    "Bermuda",
    "Bhutan",
    "Brazil",
    "Bulgaria",
    "Myanmar/Burma",
    "Canada",
    "China",
    "Colombia",
    "Cuba",
    "Denmark",
    "Egypt",
    "France",
    "Germany",
    "Greece",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Italy",
    "Japan",
    "Kazakhstan",
    "Kuwait",
    "Malaysia",
    "Mexico",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Korea",
    "Pakistan",
    "Singapore",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Swaziland",
    "Turkey",
    "United States of America (USA)",
     "Zimbabwe"];
  
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

  editClicked(){
    this.isEdit=!this.isEdit;
    if(this.isEdit){
      this.editButtontitle="Update";
    }
    else{
      this.editButtontitle="Edit";
      this.updateData();
    }
  }

  updateData(){
    console.log("Update Data Clicked");
  }
  
}
