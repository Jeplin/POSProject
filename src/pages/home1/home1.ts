import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Home2Page } from '../home2/home2';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';
import { TablePage } from '../table/table';
import { TableDetailsProvider } from '../../providers/table-details/table-details';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the Home1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {
  totalFloor: number; 
  layoutData: any;
  tableData:any;

  floorNo:number;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private layout:ApidataProvider,private floor:FloorCountProvider,private tableDetail:TableDetailsProvider,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {

    this.displayFloorUI();
    this.getLayoutData();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home1Page');
    //this.getLayoutData();
  }

  ionViewWillEnter(){
    console.log("Will Enter");
    this.getLayoutData();
  }

  displayFloorUI(){
    this.floorNo=this.floor.getFloorCount();
    console.log("FloorNo :" ,this.floorNo);
  }

  getLayoutData(){
    //this.showLoader();
    this.layout.getLayoutData().subscribe(data =>{
      console.log(data);
      if(data!=""){
        //this.loading.dismiss();
        this.layoutData=data;
      
        console.log("data : ",this.layoutData[0]["floors"]);
        this.dataFilterMethod();
      }
      else{
        this.loading.dismiss();
        this.showAlert("Oops!","Unable to load data..");
        //this.displayFloorUI();
        //this.getLayoutData();
      }
      

    },err=>{
      //this.loading.dismiss();
      console.log("my error :");
      this.showAlert("Server Error!","Please check your connect and try again..");
      
    });
  }

  dataFilterMethod(){
    this.totalFloor=this.layoutData[0]["number_of_floor"];

    this.filterFloor();
  }

  filterFloor(){        
    let floorData=this.layoutData[0]["floors"][this.floorNo-1];
    
    console.log("Floor :",floorData);
    this.tableData=floorData["tables"];
    console.log("Tables :",this.tableData);
  }

  tableClicked(tableData,tableNo){
    console.log("Table Clicked Data :",tableData);

    this.tableDetail.setTableDetails(tableData);
    tableNo=tableNo;
    this.floor.setTableCount(tableNo);

    this.navCtrl.push(TablePage);
  
  }

  goPrevious(){
    if(this.floorNo>1){
      this.floor.setFloorCount(this.floorNo-1);
      this.navCtrl.setRoot(Home2Page);
    }
    
  }

  goNext(){
    if(this.floorNo<this.totalFloor){
      this.floor.setFloorCount(this.floorNo+1);
      this.navCtrl.setRoot(Home2Page);
    }
    
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
            this.displayFloorUI();
            this.getLayoutData();
            console.log('Agree clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
