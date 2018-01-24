import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav } from 'ionic-angular';
import { MenucardPage } from '../menucard/menucard';

import { ProfilePage } from '../profile/profile';
import { AttendencePage } from '../attendence/attendence';
import { Home1Page } from '../home1/home1';
import { LoginPage } from '../login/login';
import { TablePage } from '../table/table';
//import { ProfiletabPage } from '../profiletab/profiletab';


/**
 * Generated class for the NavmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navmenu',
  templateUrl: 'navmenu.html',
})
export class NavmenuPage {
  @ViewChild(Nav) nav: Nav;
  
    rootPage: any = Home1Page;
  
    pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.pages = [
      { title: 'Tables', component: Home1Page },
      { title: 'Menu Card', component: MenucardPage },
      { title: 'Profile' , component:ProfilePage},
      { title: 'Attendence' , component:AttendencePage}

    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavmenuPage');
  }

  openPage(page) {
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  profileClicked(){
    this.nav.setRoot(ProfilePage);
  }

  logoutMethod(){
    this.navCtrl.setRoot(LoginPage);
  }

}
