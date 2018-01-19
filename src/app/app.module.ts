import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavmenuPage } from '../pages/navmenu/navmenu';
import { LoginPage } from '../pages/login/login';
import { MenucardPage } from '../pages/menucard/menucard';
import { ApidataProvider } from '../providers/apidata/apidata';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import { Home1PageModule } from '../pages/home1/home1.module';
//import { Home2PageModule } from '../pages/home2/home2.module';
import { ProfilePage } from '../pages/profile/profile';
import { AttendencePage } from '../pages/attendence/attendence';
import { FloorCountProvider } from '../providers/floor-count/floor-count';
import { Home1Page } from '../pages/home1/home1';
import { Home2Page } from '../pages/home2/home2';
import { TablePage } from '../pages/table/table';
import { ChartsModule } from 'ng2-charts';
import { TableDetailsProvider } from '../providers/table-details/table-details';
import { OrdermenuProvider } from '../providers/ordermenu/ordermenu';
//import { ProfiletabPage } from '../pages/profiletab/profiletab';
//import {RoundProgressModule} from 'angular-svg-round-progressbar';

// use this -- npm install web-animations-js @angular/animations@4.0.0 --save


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NavmenuPage,
    Home1Page,
    Home2Page,
    TablePage,
    MenucardPage,
    ProfilePage,
    AttendencePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NavmenuPage,
    Home1Page,
    Home2Page,
    TablePage,
    MenucardPage,
    ProfilePage,
    AttendencePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApidataProvider,
    FloorCountProvider,
    TableDetailsProvider,
    OrdermenuProvider,
  ]
})
export class AppModule {}
