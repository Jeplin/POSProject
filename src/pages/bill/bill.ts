import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Home1Page } from '../home1/home1';

/**
 * Generated class for the BillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html',
})
export class BillPage {

  totPrice: number;
  orderedDate: any;
  custName: string;
  tableID:number;
  orderedId:number;

  billOrdered:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private apiServe:ApidataProvider) {

    let billData=navParams.get("orderBill");
    console.log("All Final Bill :",billData);
    this.tableID=navParams.get("tableId");
    console.log("Table Id :",this.tableID);

    this.custName=billData[0].customerName;
    this.billOrdered=billData[0].orders;
    this.orderedId=billData[0].id;
    let totPrices:number=0;
    this.billOrdered.forEach(element => {
      totPrices=totPrices+parseInt(element.tot_price);
    });
    this.totPrice=totPrices;
    this.orderedDate=billData[0].modified_date; 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPage');
  }
  ionViewWillEnter(){
    console.log('ionViewEnter BillPage');
  }

  doneClicked(){
    let data={tableId:this.tableID,orderedId:this.orderedId};
    this.apiServe.updateTableStatus(data).subscribe(data=>{
      console.log("Done Success ");
      this.navCtrl.setRoot(Home1Page);
    },error=>{
      console.log("Server Error");
    });
    
  }

}
