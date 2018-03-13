import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
  public firstParam;
  apiUrl = "https://ahorroygano.com/api/v2/";
  //apiUrl = "http://localhost:8000/api/v2/";
  user:any;
  notificaciones:any;
  active:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http
      .get(this.apiUrl + "notificaciones/" + localStorage.getItem("id"))
      .map(res => res.json())
      .subscribe(respuesta => {
        this.notificaciones = respuesta.notificaciones;
        if (!this.notificaciones == null) {
          this.active = true;
        }
        console.log("res ajax: " + JSON.stringify(respuesta));
      }, err => {
        alert(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }

}
