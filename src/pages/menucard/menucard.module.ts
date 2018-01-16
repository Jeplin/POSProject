import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenucardPage } from './menucard';

@NgModule({
  declarations: [
    MenucardPage,
  ],
  imports: [
    IonicPageModule.forChild(MenucardPage),
  ],
})
export class MenucardPageModule {}
