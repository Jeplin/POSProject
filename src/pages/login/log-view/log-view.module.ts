import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogViewPage } from './log-view';

@NgModule({
  declarations: [
    LogViewPage,
  ],
  imports: [
    IonicPageModule.forChild(LogViewPage),
  ],
})
export class LogViewPageModule {}
