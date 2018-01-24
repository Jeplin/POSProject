import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';

import { Chart } from 'chart.js';
import { TableDetailsProvider } from '../../providers/table-details/table-details';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';
import { OrdermenuProvider } from '../../providers/ordermenu/ordermenu';
import { OrdermenuCardPage } from '../ordermenu-card/ordermenu-card';

//import { trigger, state, style, animate, transition } from '@angular/animations';

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
  inputCustomer:string="";
  orderedList: any;
  isOrdered: boolean;
  orderedmenuList: any;
  colorArr: string[];
  dataArr: number[];
  orderStatus:string;

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

  isPOPUP:boolean = false;
  isDeleted:boolean=false;
  isConfirm:boolean=false;
  isWithName:boolean=false;
  isNameDisplay:boolean=false;

  // temp storage variable
  tempItemName:string;
  tempItemPrice:number;
  tempItemQuant:number;
  tempDelIndex:number;

  tempConfirmOrder:any;

  customerName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuData:ApidataProvider,private tableDetail:TableDetailsProvider,private floorDetail:FloorCountProvider,private orderMenu:OrdermenuProvider) {
    this.getMenuData();

    this.orderMenu.resetAllData();
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
    this.tableNo=this.tableNo+1;

    this.tableData=this.tableDetail.getTableDetails();

    console.log("Table Data : ",this.tableData);
    let capCity=this.tableData["table_capacity"];
    this.checkIfBooked(this.tableData);
    this.prepareChartData(capCity);
  }

  checkIfBooked(tableInfo){
    console.log("Check ");
    if(tableInfo["table_status"]==3){
      console.log("Check inside");
      let data={floorNo:this.floorNo,tableNo:this.tableNo};

      let jsonData=JSON.stringify(data);

      this.menuData.getOrderedData(data).subscribe(data=>{
        console.log("On Success",data);

        this.customerName=data[0]["customerName"];
        this.isNameDisplay=true;
        this.orderStatus=data[0]["orderStatus"];
        console.log("cust:",this.customerName);
        this.orderedList=data[0]["orders"];
        console.log("ordss :",this.orderedList);

      },error=>{
        console.log("Server Error to get check");
      });
    }
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

    // this.menuList=[{item_name:"Item1 sds",item_price:20},
    //               {item_name:"Item2",item_price:50},
    //               {item_name:"Item3",item_price:40},
    //               {item_name:"Item4",item_price:30},
    //               {item_name:"Item5",item_price:70}
    //             ];
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

    this.orderMenu.addOrderMenu(name,price,1);

    this.tempItemName=name;
    this.tempItemPrice=price;
    this.tempItemQuant=1;
    //this.isPOPUP=true;
    this.isDeleted=false;
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

  cancelClicked(){
    this.isPOPUP=false;
    this.isDeleted=false;
    this.isConfirm=false;
  }

  decreaseQuant(){
    
    if(this.tempItemQuant>1){
      this.tempItemQuant=this.tempItemQuant-1;
    }
  }

  increaseQuant(){
    this.tempItemQuant=this.tempItemQuant+1;
  }

  okClicked(){
    this.isPOPUP=false;
    console.log("Name :",this.tempItemName," Price : ",this.tempItemPrice);
    if(this.isDeleted){
      this.orderMenu.updateOrderMenu(this.tempItemName,this.tempItemPrice,this.tempItemQuant,this.tempDelIndex);
    }else{
      this.orderMenu.addOrderMenu(this.tempItemName,this.tempItemPrice,this.tempItemQuant);
    }
    
    this.getOrderedMenu();

  }

  removeClick(){
    this.orderMenu.removeMenuItem(this.tempDelIndex);
    this.isPOPUP=false;
    this.getOrderedMenu();
  }

  orderListClicked(order,index){
    this.isDeleted=true;
    this.isPOPUP=true;
    this.tempItemName=order.itemName;
    this.tempItemPrice=order.itemPrice;
    this.tempItemQuant=order.quant;
    this.tempDelIndex=index;
  }

  placeOrder(){

    if(this.customerName==null || this.customerName==""){
      console.log("No name");
      this.isWithName=true;
      this.isConfirm=false;
    }
    else{
      console.log("Name Available");
      this.isWithName=false;
      this.isConfirm=true;
    }
    
    this.tempConfirmOrder=this.orderMenu.getOrderedMenu();

    console.log("Confirm Data :",this.customerName);
    
  }

  confirmClicked(){

    //this.customerName="Jeplin";

    let table_ID=this.tableData["id"];
    let orders=this.orderMenu.getOrderedMenu();
    console.log(orders);
    let data={floorNo:this.floorNo,tableNo:this.tableNo,tableId:table_ID,customerName:this.customerName,order:orders};

    this.menuData.postOrderedMenu(data).subscribe(data=>{
      console.log("On Success");

      this.refreshAll();
      this.getOrderedMenu();
      this.isConfirm=false;

    },error=>{
      console.log("Server Error");
    });

    

  }

  customerNameSubmit(){
    console.log("Input ---",this.inputCustomer);

    this.customerName=this.inputCustomer;
    this.isConfirm=true;
    this.isWithName=false;

  }


  refreshAll(){
    this.isOrdered=false;

    this.orderMenu.resetAllData();

      let data={floorNo:this.floorNo,tableNo:this.tableNo};

      let jsonData=JSON.stringify(data);

      this.menuData.getOrderedData(data).subscribe(data=>{
        console.log("On Success",data);

        this.customerName=data[0]["customerName"];
        this.orderStatus=data[0]["orderStatus"];
        this.isNameDisplay=true;
        
        console.log("cust:",this.customerName);
        this.orderedList=data[0]["orders"];
        console.log("ordss :",this.orderedList);

      },error=>{
        console.log("Server Error to get check");
      });
    }
  
    openmenu(){
      this.navCtrl.push(OrdermenuCardPage);
    }

}
