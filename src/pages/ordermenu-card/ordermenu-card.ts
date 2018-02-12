import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApidataProvider } from '../../providers/apidata/apidata';
import { OrdermenuProvider } from '../../providers/ordermenu/ordermenu';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the OrdermenuCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordermenu-card',
  templateUrl: 'ordermenu-card.html',
})
export class OrdermenuCardPage {

  menuList:any;
  checkBoxArray:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private menuData:ApidataProvider,private orderMenu:OrdermenuProvider,private alertCtrl:AlertController) {
    
    this.checkBoxArray=[];

    // this.menuList=[
    //   {item_name:"Name1",item_price:"Price1"},
    //   {item_name:"Name2",item_price:"Price2"},
    //   {item_name:"Name3",item_price:"Price3"},
    //   {item_name:"Name4",item_price:"Price4"},
    //   {item_name:"Name5",item_price:"Price5"},
    //   {item_name:"Name6",item_price:"Price6"},
    //   {item_name:"Name7",item_price:"Price7"},
    //   {item_name:"Name8",item_price:"Price8"},
    //   {item_name:"Name9",item_price:"Price9"},
    //   {item_name:"Name10",item_price:"Price10"},
    //   {item_name:"Name11",item_price:"Price11"},
    //   {item_name:"Name12",item_price:"Price12"},
    // ];

    // this.menuList.forEach(element => {
    //   this.checkBoxArray.push(false);
    // });
    this.getMenuData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenucardPage');

    
    //this.getMenuData();
  }

  getMenuData(){
    this.menuData.getMenuData().subscribe(data =>{
      console.log("Menu List : "+data);
      if(data!=""){
        this.menuList=data;

        this.menuList.forEach(element => {
          this.checkBoxArray.push(false);
        });
      }
      else{
        this.showAlert("Oops!","Unable to load data..");
        this.getMenuData();
      }
    });
  }

  itemClicked(index){
    console.log("Item Clicked",index);
    this.validateCheck(index);
  }

  onChangeClicked(index){
    console.log("OnChange Clicked",index);
    this.validateCheck(index);
  }

  validateCheck(index){
    const foundAt = this.checkBoxArray[index];
    console.log(foundAt);
    if (foundAt) {
       this.checkBoxArray[index]=false;
    } else {
     this.checkBoxArray[index]=true;
   }
  }

  doneClicked(){
    //let allCheckedData=[];
    for(let i=0;i<this.checkBoxArray.length;i++){
      if(this.checkBoxArray[i]){
        //allCheckedData.push(this.menuList[i]);
        this.orderMenu.addOrderMenu(this.menuList[i].item_name,this.menuList[i].item_price,1);
      }
    }
    
    this.navCtrl.pop();
    //console.log("Alll Set -- ",allCheckedData);
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
