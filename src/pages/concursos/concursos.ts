import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
let apiUrl = "https://ahorroygano.com/api/v2/";
//let apiUrl = "http://localhost:8000/api/v2/";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-concursos',
  templateUrl: 'concursos.html',
})
export class ConcursosPage {
  concurso:any;
  competidores:any;
  antiguo:any;
  items:any;
  usuario:any;
  lugar:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _http: Http, public pr_authservice:AuthServiceProvider) {
    this.datos_login();

    this._http.get(apiUrl + 'concurso')
    .map(res => res.json()).subscribe(data => {

    if(data.status == 'err'){
      console.log('no hay datos' );
    }

    if (data.status == 'ok' ) {
      this.concurso = data.concurso;
      this.competidores = data.competidores;
      this.antiguo = data.antiguo;
      this.lugar = data.lugar;
      console.log('datos recibidos' + JSON.stringify(data));
      console.log(JSON.stringify("   ...    "));
      console.log(JSON.stringify(data.concurso));
      console.log(JSON.stringify(data.competidores));
    }
    },
    error => {
      console.log(error);
    });
  }

  datos_login(){
    this.usuario = this.pr_authservice.get_variable_login();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcursosPage');
    console.log('datos de la variable usuario : ' + this.usuario);
  }

}
