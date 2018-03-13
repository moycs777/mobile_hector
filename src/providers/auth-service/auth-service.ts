import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, Response } from '@angular/http';
import {PrrutaProvider} from '../prruta/prruta'


@Injectable()
export class AuthServiceProvider {
  apiUrl:string;
  variable_login:any;
  _token:any;

  constructor(public http: Http, public ruta:PrrutaProvider) {
    this.apiUrl=this.ruta.get_url();
   }
   set_token(value){
    this._token=value;
   }
   get_token(){
    return this._token;
   }
  /*los getters y setters*/
  set_variable_login(value){
    this.variable_login=value;
  }
  get_variable_login(){
    return this.variable_login;
  }

  /***********************/
  login(credentials){
    var variable_envio=JSON.stringify(credentials);
    var url = this.apiUrl+'login';
    let var_header = new Headers();
    var_header.append('Content-Type', 'application/json');
    let headers_envio={ headers: var_header };
    /*si quiero obtener el valor debo agregar el .map(res => res.json())*/
    var response = this.http.post(url,variable_envio,headers_envio).map((res: Response) => res.json());
    return response;
  }

}
