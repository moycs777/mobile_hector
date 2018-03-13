import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { RegisterPage } from '../register/register';
import { Facebook } from "@ionic-native/facebook";
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [AuthServiceProvider]
})
export class HomePage {
  /*principal login*/
  loading: any;
  enviodata:any;
  loginData = { email: "", password: "" };
  data: any;
  apiUrl = 'https://ahorroygano.com/api/v2/';
  //apiUrl = 'http://localhost:8000/api/v2/';
  isLoggedIn: boolean = false;
  user: any;
  userProfile: any = null;
  constructor(public navCtrl: NavController,public authService: AuthServiceProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private fb: Facebook,public tw: TwitterConnect,public http: Http) {
    fb
      .getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }


  logoutTW(){
    this.tw.logout().then(
      r => {
        console.log("exitoso")
      },
      err => {
      console.log("error")
      }
    );
  }

  doLogin() {
    this.showLoader();
     this.authService.login(this.loginData).subscribe(
        result => {
         this.data=result;
         this.loading.dismiss();
         console.log("REGISTRO LOGIN");
         /*let variable_token=JSON.stringify(this.data.success);
         let variable_data_usuario=JSON.stringify(this.data.user);*/
         /*EL LOCALSTORAGE*/
          localStorage.setItem("token", this.data.success.token);
          localStorage.setItem("id", this.data.user.id);
          localStorage.setItem("user", this.data.user);
          this.authService.set_variable_login(this.data); /*los datos del login*/
          this.navCtrl.setRoot("DashboardPage", {user: this.data.user});
         /*****************/
        },
        err => {
          console.log(err);
          this.loading.dismiss();
        },
      );
    /* ******************Lo viejo*******************************

    this.authService.login(this.loginData).then();
      result => {
        this.loading.dismiss();
        this.data = result;
        localStorage.setItem("token", this.data.success.token);
        localStorage.setItem("id", this.data.user.id);
        localStorage.setItem("user", this.data.user);
        console.log("user token: " + this.data.success.token);
        console.log("user id: " + this.data.user.id);
        console.log("datos del user: " + JSON.stringify(this.data.user));
        //console.log(this.loginData + this.data.token);
        this.navCtrl.setRoot("DashboardPage", {
          user: this.data.user
        });
         },
      err => {
        console.log("error");
        this.loading.dismiss();
        this.presentToast(err);
      }
    this.loginData
     */
  }

  loginFB() {
    this.fb
      .login(["public_profile", "user_friends", "email"])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
          //this.navCtrl.push("DashboardPage");
        } else {
          this.isLoggedIn = false;
        }      })
      .catch(e => console.log("Error logging into Facebook", e));
  }

  logoutFB() {
    this.fb
      .logout()
      .then(res => (this.isLoggedIn = false))
      .catch(e => console.log("Error logout from Facebook", e));
  }

  getUserDetail(userid) {
    this.fb
      .api("/" + userid + "/?fields=id,email,name,picture,gender", [
        "public_profile"
      ])
      .then(res => {
        console.log(res);
        this.user = res;
        this.apiSocialLogin(res);
      })
      .catch(e => {
        console.log(e);
      });
  }

  apiSocialLogin(user) {
    this.user.provider = "facebook";
    this.presentToast("esto es lo q enviaremos al controlador en laravel: " + JSON.stringify(this.user));

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.presentToast("entrando a el controlador");
      this.user.provider = "facebook";
      this.http.post(this.apiUrl + 'loginsocial', JSON.stringify(this.user), { headers: headers })
        .subscribe(res => {
          this.enviodata = res.json()
          resolve(res.json());
          //hacemos login
          if (res.json().status == 'login' ) {
            this.presentToast(" exito al index: " + JSON.stringify(res));
            console.log(res.json().status == "login");
            localStorage.setItem("token", res.json().success.token);
            localStorage.setItem("id", res.json().user.id);
            localStorage.setItem("user", res.json().user);
            console.log("user token: " + res.json().success.token);
            console.log("user id: " + res.json().user.id);
            console.log("datos del user: " + JSON.stringify(res.json().user));
            this.navCtrl.setRoot("DashboardPage", {
              user: res.json().user
            });

          }
          //vamos a registrar
          if (res.json().status == 'registro'  ) {
            this.presentToast("exito ref: " + JSON.stringify(res));
            console.log(res);
            this.navCtrl.push("CodigodereferidoPage", {
              user: res.json().data,//id, name, email
            });
          }
        }, (err) => {
          this.presentToast("error :" );
          this.presentToast("error :" + JSON.stringify(err));
          console.log(err);
          reject(err);
          this.navCtrl.popToRoot();
        });
        /* this.navCtrl.setRoot("IndexPage", {
          user: this.enviodata
        }); */
        /*
        this.navCtrl.setRoot('CodigodereferidoPage',);
*/

    });

  }

  apiSocialLoginTW(user) {
    this.user.provider = "twitter";
    this.presentToast("esto es lo q enviaremos al controlador en laravel: " + JSON.stringify(this.user));
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.presentToast("entrando a el controlador");
      this.user.provider = "twitter";
      this.http.post(this.apiUrl + 'loginsocial', JSON.stringify(this.user), { headers: headers })
        .subscribe(res => {
          this.enviodata = res.json()
          resolve(res.json());
          //hacemos login

          //vamos a registrar
          if (res.json().status == 'registro'  ) {
            this.presentToast("exito ref: " + this.enviodata.data);
            console.log(res);
            this.navCtrl.push("CodigodereferidoPage", {
              user: this.enviodata.data,//id, name, email
            });
          }
        }, (err) => {
          this.presentToast("error :" );
          this.presentToast("error :" + JSON.stringify(err));
          console.log(err);
          reject(err);
          this.navCtrl.popToRoot();
        });
        /* this.navCtrl.setRoot("IndexPage", {
          user: this.enviodata
        }); */
        /*
        this.navCtrl.setRoot('CodigodereferidoPage',);
*/

    });

  }



  loginTW(): void{

    let env = this;
    //Request for login
    this.tw.login().then(result => {

      //Get user data
      env.tw.showUser().then(res => {
        //Save the user data in NativeStorage
        localStorage.setItem('user',
        JSON.stringify({
          id: res.id,
          name: res.name,
          token: res.token
        }));
        this.user = {id: res.id,
          name: res.name,
          email: res.email};
        this.presentToast(JSON.stringify(this.user));
        this.apiSocialLoginTW(this.user);


        });

      }, (error) => {
        this.presentToast(error)
      });
  }




  register() {
    this.navCtrl.push("RegisterPage");
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 9000,
      position: "bottom",
      dismissOnPageChange: true
    });
    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    toast.present();
  }
}
