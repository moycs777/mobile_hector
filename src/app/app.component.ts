import { Component } from '@angular/core';
import { Platform,LoadingController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;  
    showRoot = false;
  /*
  rootPage:any = Entrada1;
*/ config: any;
  loader:any;   
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public oneSignal: OneSignal, public loadingCtrl:LoadingController, public authService:AuthServiceProvider, public alertCtrl:AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }
  );
  
  
  if (localStorage.getItem('id')){
    this.rootPage = 'DashboardPage';
 }else{
    this.notificaciones();
   this.rootPage = "HomePage";
   localStorage.clear();
 }
 this.showRoot = true;

  }
 notificaciones(){
    this.oneSignal.startInit('c351fa8a-76e4-428b-b6dd-110718c746ca', '371884190746'); //(appId_onesignal,googleProjectNumber)
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData =>{
      let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  this.oneSignal.endInit();
  this.presentLoading_carga();
  this.oneSignal.getIds().then((id)=>{
    let el_id=id.userId; /*el id para guardarlo en el token de la base de datos*/
    this.authService.set_token(el_id);
    this.loader.dismiss();
  })
  }
  presentLoading_carga(){
    this.loader = this.loadingCtrl.create({
        content: "Cargando..."
    });
    this.loader.present();
 }
}

