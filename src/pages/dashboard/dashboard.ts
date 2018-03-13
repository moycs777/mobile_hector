//import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicPage, NavParams } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Http } from "@angular/http";
import "rxjs/add/operator/map";
//import {FileTransfer,FileUploadOptions,FileTransferObject} from "@ionic-native/file-transfer";
//import { File } from "@ionic-native/file";
//import { Camera } from "@ionic-native/camera";
/*
  Generated class for the Principal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  apiUrl = "https://ahorroygano.com/api/v2/";
  email: any;
  user:any;
  password: any;
  loggedIn: boolean;
  is_notificated:any;
  public firstParam;
  data_login:any;
  @ViewChild(Nav) nav: Nav;

  // make UsersPage the root (or first) page
  rootPage: any = "IndexPage";
  pages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen,public navParams: NavParams, public http: Http, public pr_authservice:AuthServiceProvider) {
    this.firstParam = navParams.get("user");
    console.log("DASHBOARD" + JSON.stringify(this.firstParam));
    this.initializeApp();

    //Buscar el usuario
    this.http
      .get(this.apiUrl + "perfil/" + localStorage.getItem("id") )
      .map(res => res.json())
      .subscribe(respuesta => {
          this.user = respuesta.user;
          /* if (respuesta.user.notification == 1) {
              this.is_notificated = 1;
          } */
          //this.is_notificated = 1;
          console.log("res ajax: " + JSON.stringify(respuesta));
        }, err => {
          alert(err);
        });

    // set our app's pages
    this.pages = [
      { title: "Inicio", component: "IndexPage", icon: "home" },
      { title: "Mis Cupones", component: "CuponesPage", icon: "pricetags" },
      { title: "Concurso", component: "ConcursosPage", icon: "trophy" },
      /* { title: "Perfil", component: "PerfilPage", icon: "person" }, */
      { title: "Notificaciones", component: "NotificacionesPage", icon: "notifications" },
      { title: "Salir", component: null, icon: "exit" }
    ];
  }
  datos_login(){
    this.data_login=this.pr_authservice.get_variable_login();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component) {
      this.nav.setRoot(page.component);
    } else {
      // Since the component is null, this is the logout option
      // ...

      // logout logic
      // ...

      // redirect to home

      localStorage.clear()
      this.email = "";
      this.password = "";
      this.loggedIn = false;
      this.nav.setRoot("HomePage");
      this.nav.popToRoot();
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    /*this.nav.setRoot(page.component);*/
  }
}


