import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
/**
 * Generated class for the BusquedaresultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let apiUrl = 'https://ahorroygano.com/api/v2/';

@IonicPage()
@Component({
  selector: 'page-busquedaresultado',
  templateUrl: 'busquedaresultado.html',
})
export class BusquedaresultadoPage {
category:any;
type:any;
city:any;
provincie:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _http: Http) {
this.category = navParams.get('category');
this.type = navParams.get('type');
this.city = navParams.get('city');
this.provincie = navParams.get('provincie');


console.log(this.category)
console.log(this.type)
console.log(this.city)
console.log(this.provincie)

        this._http
          .post(apiUrl + "search", JSON.stringify({
            category: this.category, type: this.type, city: this.city, provicie: this.provincie}), {
          })
          .map((res: Response) => res.json())
          /*Para quitar el _body dl mapeo sehce estoy*/
          .subscribe(
            res => {
              console.log("res : " + JSON.stringify(res));
              //console.log("status : " + JSON.stringify(res.status));
             // console.log("token : " + JSON.stringify(res.success.token));
            },
            err => {
              //console.log("error : " + err);
              console.log("usuario o clave invalidos");
            }
          );
        /*
            this._http
      .post(apiUrl + "search", JSON.stringify(this.Filtroform.value), {
        headers: headers
      })
      .map((res: Response) => res.json())
      /*Para quitar el _body dl mapeo sehce estoy*//*
      .subscribe(
        res => {
          console.log("res : " + JSON.stringify(res));
          //console.log("status : " + JSON.stringify(res.status));
         // console.log("token : " + JSON.stringify(res.success.token));
        },
        err => {
          //console.log("error : " + err);
          console.log("usuario o clave invalidos");
        }
      );*/
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedaresultadoPage');
  }

}
