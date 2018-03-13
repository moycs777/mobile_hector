import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';


let apiUrl = 'https://ahorroygano.com/api/v2/';
//let apiUrl = "http://localhost:8000/api/v2/";
@IonicPage()
@Component({
  selector: "page-codigodereferido",
  templateUrl: "codigodereferido.html"
})
export class CodigodereferidoPage {
  isLoggedIn: boolean = false;
  user:any = this.navParams.get('user');
  refferForm: FormGroup;
  data: any;

  constructor(
    public navCtrl: NavController,public navParams: NavParams,
    public formBuilder: FormBuilder,public http: Http, private toastCtrl: ToastController)
    {

    this.refferForm = formBuilder.group({
      reffer_id: ["", , Validators.required],
      provider_id: [""],
      email: [""],
      name: [""]
    });
  }

  
  completar(value: any): void {
    this.presentToast("value : " + JSON.stringify(value) );    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(apiUrl + 'completesocial', JSON.stringify(this.refferForm.value), {headers: headers})
    .map((res: Response) => res.json())
    .subscribe(res => {
      this.data = res;
      console.log("res : " + JSON.stringify(res) );
      console.log("status : " + JSON.stringify(res.status));
      /* if(res.status == 'ok'){ */
        this.presentToast("ok : " + res.json() );        
        console.log(res.json().status == "login");
    //    localStorage.setItem("token", res.json().success.token);
        localStorage.setItem("id", res.json().user.id);
        localStorage.setItem("user", res.json().user);
        console.log("user token: " + res.json().success.token);
        console.log("user id: " + res.json().user.id);
        console.log("datos del user: " + JSON.stringify(res.json().user));
        this.presentToast("fin : " + res );
        this.navCtrl.push("DashboardPage", {
          user: res.json().user
        });  
      /* } */
    },
    (err) => {
      //console.log("error : " + err);
      console.log("usuario o clave invalidos");
      this.presentToast("error en server: " + JSON.stringify(err) );
    });
    //this.navCtrl.setRoot("HomePage");
  }
  
  ionViewDidLoad() {
    console.log("ionViewDidLoad CodigodereferidoPage");
    console.log("idatos del usuario: " + this.user);
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
