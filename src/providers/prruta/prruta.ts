import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PrrutaProvider {
	url:string='https://ahorroygano.com/api/v2/';
  constructor(public http: HttpClient) {
    console.log('Hello PrrutaProvider Provider');
  }
  get_url(){
  	return this.url;
  }
  

}
