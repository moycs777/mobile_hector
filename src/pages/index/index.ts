import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
let apiUrl = 'https://ahorroygano.com/api/v2/';
//let apiUrl = "http://localhost:8000/api/v2/";
@IonicPage()
@Component({
  selector: "page-index",
  templateUrl: "index.html"
})
export class IndexPage {
  private result: any[];
  private searchItems: any;
  activo: any;
  data = [];
  categorias: any;
  estados: any;
  ciudades: any;
  searchQuery: any;
  items: any;
  userID: String;
  busqueda: FormGroup;
  selectedEstados: any;
  selectedCiudad: any;
  lista = [];
  posicion = 0;
  name: any;
  Filtroform: FormGroup;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public _http: Http, public formBuilder: FormBuilder, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.Filtroform = formBuilder.group({
      category: ["", Validators.required],
      type: ["", Validators.required],
      city: ["", Validators.required],
      provincie: ["", Validators.required],
    });


    for (let i = 0; i < 2; i++) {
      this.data.push(this.data.length);
    }
    /*
    this.iniciarLista();*/
    let localData = this._http
      .get(apiUrl + "home")
      .map(res => res.json().items);

    this.busqueda = formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required]
    });

    localData.subscribe(data => {
      this.result = data;
    });



    this.initializeItems();
    this.userID = localStorage.getItem("id");
    console.log(this.userID);
    console.log();
    this.searchQuery = "";
    this._http
      .get(apiUrl + "home")
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.success == null) {
            console.log("no hay datos");
          }

          if (data.success) {
            this.data = data.success;
            this.categorias = data.categorias;
            this.estados = data.estados;
            this.ciudades = data.ciudades;
            console.log("datos recibidos" + JSON.stringify(data));
            console.log(JSON.stringify("   ...    "));
            console.log(JSON.stringify(data.success));
          }
        },
        error => {
          console.log(error);
        }
      );
  }


  ionViewCanEnter(){
    this.name = localStorage.getItem("user");
    console.log("NOMBRE POR INDEX" + JSON.stringify(this.name));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad IndexPage");
    console.log(this.userID);
  }

  DownloadCupones(item) {
    let user_id = this.userID;
    item.user_id = user_id;
    console.log(user_id);
    console.log("el item para descargar cupon " + JSON.stringify(item));
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this._http
      .post(apiUrl + "descargarcupon", JSON.stringify(item), {
        headers: headers
      })
      .map(res => res.json())
      .subscribe(
        data => {
          this.navCtrl.push("CuponesPage");
          console.log(
            "el cupon descargado es: " + JSON.stringify(data)
          );
        },
        error => {
          console.log(error);
        }
      );
    console.log(JSON.stringify(item));
  }
  /*filtro*/

  initializeItems() {
    this.searchItems = this.result;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.searchItems = this.searchItems.filter(item => {
        return item.header.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  /*CAMBIO PARA EL DEPENDENT DROPDOWN */
  setCiudad(estados) {
    let id = estados;
    console.log("el estado es: " + estados);
    this._http
      .get(apiUrl + "ciudades/" + id /*, { params: id } */)
      .map(res => res.json())
      .subscribe(
        respuesta => {
          this.ciudades = respuesta.ciudades;
          this.activo = true;
          console.log("res ajax: " + JSON.stringify(respuesta));
        },
        err => {
          alert(err);
        }
      );

    //this.ciudades = ciudades.filter(ciudad => ciudad.id_provincia == estados.id_provincia);
  }

  /*realizacion del inifinite scroll*/
  /*
  iniciarLista(){
    for (let index = 0; index <15; index++) {
      this.data.push(this.posicion);
      this.posicion +=1;

    }
  }
  nextLoad(){
   for (let index = this.posicion; index < this.posicion+10; index++) {
     this.data.push(index)

   }
   this.posicion += 10;
}
*/

  /*NUEVO INFINITE SCROLL DE IONIC COMO TAL
*/
doInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    for (let i = 0; i < 4; i++) {
      this.data.push();
    }

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

/*
  doInfinite(infiniteScroll) {
    console.log("Begin async operation");

    setTimeout(() => {
      for (let i = this.posicion; i < this.posicion + 2; i++) {
        this.data.push(i);
      }
      this.posicion += 2;
      console.log("Async operation has ended");
      infiniteScroll.complete();
    }, 500);
  }
*/
/*
  onSubmit(value: any): void {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    console.log(
      "category: " +
        this.Filtroform.value.category +
        " ,type: " +
        this.Filtroform.value.type
    );
    this._http
      .post(apiUrl + "search", JSON.stringify(this.Filtroform.value), {
        headers: headers
      })
      .map((res: Response) => res.json())
      /*Para quitar el _body dl mapeo sehce estoy*/
      /*
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
  }
*/
  LoadData(value:any) {
    //this.navCtrl.push('BusquedaresultadoPage', ({ category: this.Filtroform.value.category, type: this.Filtroform.value.type, city: this.Filtroform.value.city, provincie: this.Filtroform.value.provincie }));

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.presentToast("datos del form: " + JSON.stringify(this.Filtroform.value));

    this._http
      .post(apiUrl + "search", JSON.stringify(this.Filtroform.value),{
        headers: headers
      })
      .map(res => res.json())
      .subscribe(
        data => {
          this.presentToast("respuesta: " + JSON.stringify(data));
          this.data = data;
        },
        error => {
          console.log(error);
        }
      );
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


