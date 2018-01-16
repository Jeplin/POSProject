import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';

import { Chart } from 'chart.js';
import { TableDetailsProvider } from '../../providers/table-details/table-details';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';
import { OrdermenuProvider } from '../../providers/ordermenu/ordermenu';

/**
 * Generated class for the TablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {
  isOrdered: boolean;
  orderedmenuList: any;
  colorArr: string[];
  dataArr: number[];

  // @ViewChild('barCanvas') barCanvas;
   @ViewChild('doughnutCanvas') doughnutCanvas;
  // @ViewChild('lineCanvas') lineCanvas;

  // barChart: any;
   doughnutChart: any;
  // lineChart: any;

  //public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData:number[] = [35, 45, 100,56];
  // public backgroundColors:Array<any> = [{backgroundColor:'blue'},{backgroundColor:'yellow'},{backgroundColor:'green'},{backgroundColor:'orange'}];
  // public doughnutChartType:string = 'doughnut';

  
  menuList:any;
  tableData:any;

  floorNo:number;
  tableNo:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuData:ApidataProvider,private tableDetail:TableDetailsProvider,private floorDetail:FloorCountProvider,private orderMenu:OrdermenuProvider) {
    this.getMenuData();

    // this.displayChart();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePage');
    this.getTableDetails();
    this.displayChart();
    this.getOrderedMenu();
  }

  getTableDetails(){
    this.floorNo=this.floorDetail.getFloorCount();

    this.tableNo=this.floorDetail.getTableCount();

    this.tableData=this.tableDetail.getTableDetails();

    console.log("Table Data : ",this.tableData["table_capacity"]);
    let capCity=this.tableData["table_capacity"];
    this.prepareChartData(capCity);
  }
  prepareChartData(capCity){
    if(capCity>1){
      let totCap=capCity*2;
      let divCap=100/totCap;
      console.log("Div Data : ",divCap);
      this.dataArr=[];
      this.colorArr=[];

      for (let i=0;i<totCap;i++){
        this.dataArr.push(divCap);
        if(i%2==0){
          this.colorArr.push('grey');

        }
        else{
          this.colorArr.push('white');
        }
      }
    }
    else if(capCity>0){
      this.dataArr=[25,75];
      this.colorArr=['grey','white'];
    }
    else{
      this.dataArr=[100];
      this.colorArr=['white'];
    }

    this.displayChart();
  }

  getMenuData(){
    this.menuData.getMenuData().subscribe(data =>{
      console.log("Menu List : "+data);
      this.menuList=data;
    });
  }

  displayChart(){ 
             this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
                 type: 'doughnut',
                 data: {
                     labels: [],
                     datasets: [{
                         label: '# of Votes',
                         data: this.dataArr,
                         backgroundColor: this.colorArr,
                     }]
                 }
             });
  }

  selectMenu(name,price){
    console.log("Menu Clicked : ");

    this.orderMenu.addOrderMenu(name,price);

    this.getOrderedMenu();

  }

  getOrderedMenu(){
    this.orderedmenuList=this.orderMenu.getOrderedMenu();
    if(this.orderedmenuList.length>0){
      this.isOrdered=true;
    }
    else{
      this.isOrdered=false;
    }
    console.log("Ordered menu list :",this.orderedmenuList);
  }

}
