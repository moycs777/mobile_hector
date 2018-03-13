import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PrrutaProvider } from '../providers/prruta/prruta';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { OneSignal } from '@ionic-native/onesignal';
import { Facebook } from "@ionic-native/facebook";


@NgModule({
  declarations: [MyApp],
  imports: [BrowserModule, HttpModule,HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Facebook,
    TwitterConnect,
    FileTransfer,
    Transfer,
    Camera,
    FilePath,
    OneSignal,
    //FileTransferObject,
    File,
    Camera,
    PrrutaProvider
  ]
})
export class AppModule {}
