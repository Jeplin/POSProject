import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdermenuCardPage } from './ordermenu-card';

@NgModule({
  declarations: [
    OrdermenuCardPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdermenuCardPage),
  ],
})
export class OrdermenuCardPageModule {}
