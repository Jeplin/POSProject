import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Storage } from '@ionic/storage';

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
  peraddr_two: any;
  curraddr_two: any;
  curraddr_city: any;
  peraddr_pincode: any;
  peraddr_country: any;
  peraddr_state: any;
  peraddr_city: any;
  peraddr_one: string;
  curraddr_pincode: any;
  curraddr_country: any;
  curraddr_state: any;
  curraddr_one: any;
  username: string;
  name:string;
  occupation:string;
  email:string;
  contact:string;
  dob:string;
  joining:string;
  fathername:string;
  mothername:string;
  familynumber:string;

  curraddress:any;
  perAddress:any;

  allData:any;
  profileData: any;

  user = {
    name: '',
    profileImage: 'assets/imgs/logo.png',
    coverImage: 'assets/imgs/1.jpg',
    occupation: 'Developer',
    location: 'India,IND',
    description: '',
  };

  isEdit:boolean;
  editButtontitle:string;

  countries:any;
  countrySelectCur:any;
  countrySelectPer:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private profile:ApidataProvider,private storage:Storage) {
  
    this.getUserProfileData();
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

    //this.getUserProfileData();
  }

  ionViewWillEnter(){
    console.log("Will Enter Load");
    this.getUserProfileData();
  }

  getUserProfileData(){
    let UserId="";
    this.storage.get('userId').then((val)=>{
      UserId=val;
      console.log("userId",UserId);
      this.profileDataApi(val);
    });
  }
  profileDataApi(user){
    let data={
      userId:user
    }
    this.profile.getProfileData(data).subscribe(data=>{
      //this.allData=data[0];
      console.log("Profile : ",data[0]);
      if(data!=""){
        this.displayUserData(data[0]);
      }
    });
  }

  displayUserData(data){
   
    console.log("display :",data);
    
    this.name=data['firstName'] +' '+ data['lastName'];

    this.username=data['username'];
    this.occupation=data['userType'];
    console.log('deytail :',data['details']['detail']);
    this.email=data['details']['detail']['email'];
    this.contact=data['details']['detail']['contact'];
    this.dob=data['details']['detail']['dob'];
    this.joining=data['joiningDate'];
    this.fathername=data['details']['detail']['fathername'];
    this.mothername=data['details']['detail']['mothername'];
    this.familynumber=data['details']['detail']['familycontact'];

    this.curraddr_one=data['details']['currentAddress']['address_one'];
    this.curraddr_two=data['details']['currentAddress']['address_two'];
    this.curraddr_city=data['details']['currentAddress']['city'];
    this.curraddr_state=data['details']['currentAddress']['state'];
    this.curraddr_country=data['details']['currentAddress']['country'];
    this.curraddr_pincode=data['details']['currentAddress']['pincode'];

    this.peraddr_one=data['details']['permanentAddress']['address_one'];
    this.peraddr_two=data['details']['permanentAddress']['address_two'];
    this.peraddr_city=data['details']['permanentAddress']['city'];
    this.peraddr_state=data['details']['permanentAddress']['state'];
    this.peraddr_country=data['details']['permanentAddress']['country'];
    this.peraddr_pincode=data['details']['permanentAddress']['pincode'];

  }

  editClicked(){
    this.isEdit=!this.isEdit;
    if(this.isEdit){
      this.editButtontitle="Cancel";
    }
    else{
      this.editButtontitle="Edit";
      this.updateData();
    }
  }

  updateData(){
    console.log("Update Data Clicked");
  }

  showAlert(title,message){

  }
  
}
