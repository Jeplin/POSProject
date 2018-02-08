import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Home1Page } from '../home1/home1';
import { TablePage } from '../table/table';
import { TableDetailsProvider } from '../../providers/table-details/table-details';

/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {
  totalFloor: number; 
  layoutData: any;
  tableData:any;

  floorNo:number;


  constructor(public navCtrl: NavController, public navParams: NavParams,private layout:ApidataProvider,private floor:FloorCountProvider,private tableDetail:TableDetailsProvider) {
    this.displayFloorUI();
    this.getLayoutData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');
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
    this.layout.getLayoutData().subscribe(data =>{
      console.log(data);
      this.layoutData=data;
      
      console.log("data : ",this.layoutData[0]["floors"]);
      this.dataFilterMethod();

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

  tableClicked(data,tableNo){
    this.tableDetail.setTableDetails(data);
    tableNo=tableNo;
    this.floor.setTableCount(tableNo);

    this.navCtrl.push(TablePage);
  }

  goPrevious(){
    if(this.floorNo>1){
      this.floor.setFloorCount(this.floorNo-1);
      this.navCtrl.setRoot(Home1Page);
    }
    
  }

  goNext(){
    if(this.floorNo<this.totalFloor){
      this.floor.setFloorCount(this.floorNo+1);
      this.navCtrl.setRoot(Home1Page);
    }
    
  }

}
