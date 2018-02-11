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

import { Network } from '@ionic-native/network';
import { OrdermenuCardPage } from '../pages/ordermenu-card/ordermenu-card';
import { MembershipPage } from '../pages/membership/membership';
import { BillPage } from '../pages/bill/bill';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { InvoicePage } from '../pages/invoice/invoice';
import { HistoryPage } from '../pages/history/history';

import * as moment from 'moment';
import { EditPage } from '../pages/table/edit/edit';
import { ConfirmPage } from '../pages/table/confirm/confirm';
import { CustnamePage } from '../pages/table/custname/custname';
import { LogViewPage } from '../pages/login/log-view/log-view';

import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NavmenuPage,
    Home1Page,
    Home2Page,
    TablePage,
    MenucardPage,
    OrdermenuCardPage,
    ProfilePage,
    AttendencePage,
    MembershipPage,
    BillPage,
    InvoicePage,
    HistoryPage,
    EditPage,
    ConfirmPage,
    CustnamePage,
    LogViewPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    OrdermenuCardPage,
    ProfilePage,
    AttendencePage,
    MembershipPage,
    BillPage,
    InvoicePage,
    HistoryPage,
    EditPage,
    ConfirmPage,
    CustnamePage,
    LogViewPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApidataProvider,
    FloorCountProvider,
    TableDetailsProvider,
    OrdermenuProvider,
    File,
    FileOpener
  ]
})
export class AppModule {}
