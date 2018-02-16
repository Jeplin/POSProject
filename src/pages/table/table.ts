import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';

import { Chart } from 'chart.js';
import { TableDetailsProvider } from '../../providers/table-details/table-details';
import { FloorCountProvider } from '../../providers/floor-count/floor-count';
import { OrdermenuProvider } from '../../providers/ordermenu/ordermenu';
import { OrdermenuCardPage } from '../ordermenu-card/ordermenu-card';
import { BillPage } from '../bill/bill';
import { InvoicePage } from '../invoice/invoice';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ConfirmPage } from './confirm/confirm';
import { EditPage } from './edit/edit';
import { CustnamePage } from './custname/custname';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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
  

  // @ViewChild('barCanvas') barCanvas;
   @ViewChild('doughnutCanvas') doughnutCanvas;
  // @ViewChild('lineCanvas') lineCanvas;
  allOrderedData: Object;
  inputCustomer:string="";
  orderedList: any;
  isOrdered: boolean;
  orderedmenuList: any;
  colorArr: string[];
  dataArr: number[];
  orderStatus:string;
  // barChart: any;
   doughnutChart: any;
  
  menuList:any;
  tableData:any;

  floorNo:number;
  tableNo:number;

  // isPOPUP:boolean = false;
  // isDeleted:boolean=false;
  // isConfirm:boolean=false;
  // isWithName:boolean=false;
   isNameDisplay:boolean=false;
   isBill:boolean=false;

  // temp storage variable
  tempItemName:string;
  tempItemPrice:number;
  tempItemQuant:number;
  tempDelIndex:number;

  tempConfirmOrder:any;

  customerName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private menuData:ApidataProvider,private tableDetail:TableDetailsProvider,private floorDetail:FloorCountProvider,private orderMenu:OrdermenuProvider,private modalCtrl:ModalController,private storage:Storage,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
    
    this.getMenuData();

    this.orderMenu.resetAllData();
    // this.displayChart();
      
    storage.get('userId').then((val)=>{
      console.log("userId",val);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePage');
    this.getTableDetails();
    this.displayChart();
    //this.getOrderedMenu();
  }

  ionViewWillEnter(){
    console.log("EnterView");
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
    this.orderedList=[];
    if(tableInfo["table_status"]==3){
      console.log("Check inside");
      let data={floorNo:this.floorNo,tableNo:this.tableNo};

      let jsonData=JSON.stringify(data);

      this.menuData.getOrderedData(data).subscribe(data=>{
        console.log("On Success",data);
        if(data!=""){
          this.allOrderedData=data;
        
          this.customerName=data[0]["customerName"];
          this.isNameDisplay=true;
          this.orderStatus=data[0]["orderStatus"];
          console.log("cust:",this.customerName);
          // this.orderedList=data[0]["allorders"];
          let tempAllOrder=data[0]["allorders"];
  
          console.log("ordss :",tempAllOrder);
          tempAllOrder.forEach(element => {
            let subOrder=element["orders"];
            subOrder.forEach(element2 => {
              this.orderedList.push(element2);
            });
          });
          console.log("cust23:",this.orderedList);
  
          this.isBill=true;
        }
      },err=>{
        console.log("my error :");
        this.showAlert("Server Error!","Please check your connect and try again..");
        
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
    },err=>{
      console.log("my error :");
      this.showAlert("Server Error!","Please check your connect and try again..");
      
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

    this.orderMenu.addOrderMenu(name,price,1);

    this.tempItemName=name;
    this.tempItemPrice=price;
    this.tempItemQuant=1;
    //this.isPOPUP=true;
    //this.isDeleted=false;
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

  orderListClicked(order,index){
    console.log("Order Edit Clicked")

    let data={itemName:order.itemName,itemPrice:order.itemPrice,itemQuant:order.quant,index:index};

    let modalConfirm=this.modalCtrl.create(EditPage,data,{cssClass:'inset-modal'});
    modalConfirm.onDidDismiss(data=>{
      console.log(data);
    });
    modalConfirm.present();
  }

  placeOrder(){
    //this.tempConfirmOrder=this.orderMenu.getOrderedMenu();

    let table_ID=this.tableData["id"];
    let orders=this.orderMenu.getOrderedMenu();
    console.log(orders);
    // let data={floorNo:this.floorNo,tableNo:this.tableNo,tableId:table_ID,customerName:this.customerName,order:orders};

    if(this.customerName==null || this.customerName==""){
      console.log("No name");
      // this.isWithName=true;
      // this.isConfirm=false;

      let modalConfirm=this.modalCtrl.create(CustnamePage,null,{cssClass:'inset-modal'});
      modalConfirm.onDidDismiss(data=>{
        console.log("Customer Name :",data);
        if(data !=''){
          this.customerName=data;

          //let datasend={orderedData:this.tempConfirmOrder,custName:data};
          let datasend={floorNo:this.floorNo,tableNo:this.tableNo,tableId:table_ID,customerName:this.customerName,order:orders};

          let modalConfirm=this.modalCtrl.create(ConfirmPage,datasend,{cssClass:'inset-modal'});
          modalConfirm.onDidDismiss(data=>{
            console.log(data);
            if(data!=''){
              
              this.refreshAll();
              this.getOrderedMenu();
            }
          });
          modalConfirm.present();
        }
      });
      modalConfirm.present();
    }
    else{

      let data={floorNo:this.floorNo,tableNo:this.tableNo,tableId:table_ID,customerName:this.customerName,order:orders};

      console.log("Name Available");
      let modalConfirm=this.modalCtrl.create(ConfirmPage,data,{cssClass:'inset-modal'});
      modalConfirm.onDidDismiss(data=>{
        console.log(data);
        if(data!=''){
          this.refreshAll();
          this.getOrderedMenu();
        }
      });
      modalConfirm.present();

      // this.isWithName=false;
      // this.isConfirm=true;
    }
    
    //this.tempConfirmOrder=this.orderMenu.getOrderedMenu();

    console.log("Confirm Data :",this.customerName);
    
  }

  // confirmClicked(){

  //   //this.customerName="Jeplin";

  //   let table_ID=this.tableData["id"];
  //   let orders=this.orderMenu.getOrderedMenu();
  //   console.log(orders);
  //   let data={floorNo:this.floorNo,tableNo:this.tableNo,tableId:table_ID,customerName:this.customerName,order:orders};

  //   this.menuData.postOrderedMenu(data).subscribe(data=>{
  //     console.log("On Success -- cnfrm",data);

  //     this.refreshAll();
  //     this.getOrderedMenu();
  //     //this.isConfirm=false;

  //   },error=>{
  //     console.log("Server Error");
  //   });
  // }
  refreshAll(){

      this.isOrdered=false;
      this.orderedList=[];

      this.orderMenu.resetAllData();

      let data={floorNo:this.floorNo,tableNo:this.tableNo};

      let jsonData=JSON.stringify(data);

      this.menuData.getOrderedData(data).subscribe(data=>{
        console.log("On Success 00",data);

        this.allOrderedData=data;

        this.customerName=data[0]["customerName"];
        this.isNameDisplay=true;
        this.orderStatus=data[0]["orderStatus"];
        console.log("cust:",this.customerName);
        // this.orderedList=data[0]["allorders"];
        let tempAllOrder=data[0]["allorders"];

        console.log("ordss :",tempAllOrder);
        tempAllOrder.forEach(element => {
          let subOrder=element["orders"];
          subOrder.forEach(element2 => {
            this.orderedList.push(element2);
          });
        });
        console.log("cust23:",this.orderedList);
        this.isBill=true;

      },err=>{
        console.log("my error :");
        this.showAlert("Server Error!","Please check your connect and try again..");
        
      });
    }

    viewBill(){

      console.log("Final Bill : ",this.tableData['id']);
      console.log("Final Bill-2 : ",this.allOrderedData);

      this.navCtrl.setRoot(InvoicePage,{
        tableId:this.tableData["id"],
        orderBill:this.allOrderedData
      });
    }
  
    openmenu(){
      this.navCtrl.push(OrdermenuCardPage);
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
