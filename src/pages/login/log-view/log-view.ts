import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController, ModalController } from 'ionic-angular';
import { FloorCountProvider } from '../../../providers/floor-count/floor-count';
import { Network } from '@ionic-native/network';
import { NavmenuPage } from '../../navmenu/navmenu';
import { ApidataProvider } from '../../../providers/apidata/apidata';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

/**
 * Generated class for the LogViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-view',
  templateUrl: 'log-view.html',
})
export class LogViewPage {

  username="";
  password="";

  showPasswordFlag:boolean;
  isShowPassword:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private floorCount:FloorCountProvider,private network: Network,private alertCtrl:AlertController,private modalCtrl:ModalController,private toastCtrl:ToastController,private apiCall:ApidataProvider,private storage:Storage) {

    this.mainDisplayMethod();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogViewPage');

    this.network.onConnect().subscribe(data => {
      console.log("Connected",data)
    }, error => console.error("ConErr",error));
   
    this.network.onDisconnect().subscribe(data => {
      console.log("No Connect",data)
      this.showAlert('No Internet','No internet access..');
    }, error => console.error(error));
  }

  mainDisplayMethod(){
    this.isShowPassword=true;
  }

  passwordShow(){
    console.log("Div clicked");
    if(this.isShowPassword){
      console.log("CheckBox Clicked :",this.isShowPassword);
      this.isShowPassword=false;
    }
    else{
      console.log("CheckBox Clicked :",this.isShowPassword);
      this.isShowPassword=true;
    }
  }

  loginMethod(){

    console.log("data : ",this.username,this.password);
    if(this.username==""){
      this.showToast();
    }
    else if(this.password==""){
      this.showToast();
    }
    else{
      let data={
        username:this.username,
        password:this.password
      }
      this.apiCall.getLoginData(data).subscribe(data=>{
        console.log("User Data :",data);
        if(data!=""){
          //console.log("Data available");
          if(data[0]['user_type_id']==2){
            let user=data[0]['fname'] +' '+data[0]['lname'];
            //console.log(user);
            this.storage.set('userId',data[0]['id']);
            this.storage.set('username',user);

            this.setUserAttendance(data[0]['id']);
            this.floorCount.setFloorCount(1);
            this.navCtrl.setRoot(NavmenuPage);
          }
          else{
            this.showAlert('Invalid User','Invalid username and password. Please try again..');
          } 
        }
        else{
          this.showAlert('Invalid User','Invalid username and password. Please try again..');
        }
        this.username="";
        this.password="";
      })
    }
  }

  setUserAttendance(userid){
    let todaysDate=moment().format('YYYY-MM-DD HH:mm:ss');
    console.log("Todays :",todaysDate);
    let data={
      userId:userid,
      inTime:todaysDate,
      outTime:'',
      att_id:''
    }
     this.apiCall.setAttendance(data).subscribe(data=>{
       console.log(data['message']);
       this.storage.set('attId',data['message']);
     });

  }

  showToast(){
    let toast = this.toastCtrl.create({
      message: 'Empty field not allowed!',
      duration: 3000
    });
    toast.present();
  }

  showAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
