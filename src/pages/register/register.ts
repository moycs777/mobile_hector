//import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let apiUrl = 'https://ahorroygano.com/api/v2/';
//let apiUrl = 'http://localhost:8000/api/v2/';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  authForm: FormGroup;
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {
    this.authForm = formBuilder.group({
      reffer_id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      c_password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]

  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit(value: any): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("name: "+this.authForm.value.name+" ,email: "+this.authForm.value.email)
    this.http.post(apiUrl + 'register', JSON.stringify(this.authForm.value), {headers: headers})
    .map((res: Response) => res.json())
    /*Para quitar el _body dl mapeo sehce estoy*/
    .subscribe(res => {
      this.data = res;
      console.log("res : " + JSON.stringify(res) );
      console.log("status : " + JSON.stringify(res.status));
      console.log("token : " + JSON.stringify(res.success.token) );
      localStorage.setItem("id", this.data.user.id);
      localStorage.setItem("token", this.data.user.token);
      localStorage.setItem("user", this.data.user.id);  
      console.log("ID      " +this.data.user.id + "data token      " + this.data.user.token + "data user: " +JSON.stringify(this.data.user ));    
      this.navCtrl.setRoot('DashboardPage', {
        user: JSON.stringify(this.data.user)
      });

    },
    (err) => {
      //console.log("error : " + err);
      console.log("usuario o clave invalidos");
      this.navCtrl.pop();
    });
  }


}

