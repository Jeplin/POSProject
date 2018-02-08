import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustnamePage } from './custname';

@NgModule({
  declarations: [
    CustnamePage,
  ],
  imports: [
    IonicPageModule.forChild(CustnamePage),
  ],
})
export class CustnamePageModule {}
