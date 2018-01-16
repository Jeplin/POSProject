import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavmenuPage } from './navmenu';

@NgModule({
  declarations: [
    NavmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(NavmenuPage),
  ],
})
export class NavmenuPageModule {}
