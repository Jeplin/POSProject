import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  order: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order="today";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
