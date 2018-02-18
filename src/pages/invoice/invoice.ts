import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { FileOpener } from '@ionic-native/file-opener';

import { File } from '@ionic-native/file';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { Home1Page } from '../home1/home1';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {

  totPrice: number;
  orderedDate: any;
  custName: string;
  tableID:number;
  orderedId:number;

  billOrdered:any;

  billData:any;

  pdfObj=null;

  constructor(public navCtrl: NavController, public navParams: NavParams,private plt:Platform,private file:File,private fileOpener:FileOpener,private apiServe:ApidataProvider) {
    
    let bill=navParams.get("orderBill");
     console.log("All Final Bill :",bill);
    this.tableID=navParams.get("tableId");
    console.log("Table Id :",this.tableID);

    this.billOrdered=[];
    this.custName=bill[0].customerName;
    // this.billOrdered=bill[0].allorders;
    let tempBill=bill[0].allorders;
    this.orderedId=bill[0].id;
    let totPrices:number=0;
    if(tempBill!=""){
        tempBill.forEach(element => {
            let subBill=element.orders;
            subBill.forEach(element1 => {
                this.billOrdered.push(element1);
                totPrices=totPrices+parseInt(element1.tot_price);
            }); 
        });
    }
    
    this.totPrice=totPrices;
    this.orderedDate=bill[0].modified_date; 

    this.billData=bill[0];
    console.log("Bill Data :",this.totPrice);
    console.log("All Ordered :",this.billData['allorders']);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  doneClicked(){
    console.log("Table Id :",this.tableID ," Ordered Id :",this.orderedId);
    let data={tableId:this.tableID,orderedId:this.orderedId};
    this.apiServe.updateTableStatus(data).subscribe(data=>{
      console.log("Done Success ");
      this.navCtrl.setRoot(Home1Page);
    },error=>{
      console.log("Server Error");
    });
    
  }

  createPDF(){

    //let allOrders=this.billData['allorders'];
    let allOrders=this.billOrdered;
    
    console.log("Create :",allOrders);

    var items = allOrders.map(function(item) {
      return [item.item, item.quant, item.tot_price];
    });

    console.log("Print Items :",items);
    var dd = {
        content: [
            { text: 'INVOICE', style: 'header'},

            { text: this.billData['modified_date'], alignment: 'right'},

            { text: 'Customer Name', style: 'subheader'},
            this.billData['customerName'],

            { text: 'Floor No', style: 'subheader'},
            this.billData['floorNo'],  

            { text: 'Table No', style: 'subheader'},
            this.billData['tableNo'],

            { text: 'Ordered Memo', style: 'subheader'},
            {
                style: 'itemsTable',
                table: {
                    widths: ['*', 75, 75],
                    body: [
                        [ 
                            { text: 'Menu Item', style: 'itemsTableHeader' },
                            { text: 'Quantity', style: 'itemsTableHeader' },
                            { text: 'Price', style: 'itemsTableHeader' },
                        ]
                    ].concat(items)
                }
            },
            {
                style: 'totalsTable',
                table: {
                    widths: ['*', 75, 75],
                    body: [
                        // [
                        //     '',
                        //     'Subtotal',
                        //     '3434',
                        // ],
                        // [
                        //     '',
                        //     'Shipping',
                        //     '654',
                        // ],
                        [
                            '',
                            'Total',
                            this.totPrice,
                        ]
                    ]
                },
                layout: 'noBorders'
            },
        ],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 20, 0, 5]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 30, 0, 0]
            }
        },
        defaultStyle: {
        }
    }
    this.pdfObj = pdfMake.createPdf(dd);

    this.downloadPDF();
    
  }

  downloadPDF(){
    if(this.plt.is('cordova')){
      let fileName="Invoice-"+this.billData['customerName']+"-"+this.billData['floorNo']+"-"+this.billData['tableNo']+".pdf";

      this.pdfObj.getBuffer((buffer)=>{
        var utf8=new Uint8Array(buffer);
        var binaryArray=utf8.buffer;
        var blob=new Blob([binaryArray],{type:'application/pdf'});

        this.file.writeFile(this.file.dataDirectory,fileName,blob,{replace:true}).then(fileEntry=>{
          this.fileOpener.open(this.file.dataDirectory+fileName,'application/pdf');
        })
      });
    }
    else{
      this.pdfObj.download();
    }
  }

}
