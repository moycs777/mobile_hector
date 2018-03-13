import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

let apiUrl = "https://ahorroygano.com/api/v2/";
//let apiUrl = 'http://localhost:8000/api/v2/';

@IonicPage()
@Component({
  selector: 'page-cupones',
  templateUrl: 'cupones.html',
})
export class CuponesPage {
  datacupon:String;
  cupones:any;
  puntos:any;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: Http) {

    this._http
      .get(apiUrl + "perfil/" + localStorage.getItem("id"))
      .map(res => res.json())
      .subscribe(respuesta => {
        this.puntos = respuesta.user.points;
        this.user = respuesta.user;
        console.log("el user es: " + respuesta.user);
      }, err => {
        alert(err);
      });

    this._http.get(apiUrl+'cupones/'+JSON.parse(localStorage.id))
    .map(res => res.json()).subscribe(respuesta => {

      if(respuesta.status == 'err'){
        console.log('no hay datos' );
      }

      if (respuesta.status == 'ok') {
        this.cupones = respuesta.cupones;
        //console.log('user id: ' + localStorage.id + 'los cupones de este usuario son : ' + JSON.stringify(respuesta));
        console.log(JSON.stringify("   ...    "));
        //console.log(JSON.stringify(respuesta.cupones));
      }
    },
    error => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuponesPage');
  }

}
