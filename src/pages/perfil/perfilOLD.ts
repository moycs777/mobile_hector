/* import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-perfil",
  templateUrl: "perfil.html"
})
export class PerfilPage {
  image: string = null;
  imageURI:any;
  imageFileName:any;
  apiUrl = "https://ahorroygano.com/api/v2/";
  user: any;
  constructor(public navCtrl: NavController,public navParams: NavParams,public http: Http,private transfer: FileTransfer,private camera: Camera,public loadingCtrl: LoadingController,public toastCtrl: ToastController,
  ) {
    this.http
      .get(this.apiUrl + "perfil/" + localStorage.getItem("id"))
      .map(res => res.json())
      .subscribe(
        respuesta => {
          this.user = respuesta.user;
          console.log("res ajax: " + JSON.stringify(respuesta));
        },
        err => {
          alert(err);
        }
      );
  }

  
  getPicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        console.error(error);
      });
  }



getImage() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
  }, (err) => {
    console.log(err);
    this.presentToast(err);
  });
}
uploadFile() {
  let loader = this.loadingCtrl.create({
    content: "Subiendo la foto..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let options: FileUploadOptions = {
    fileKey: ' file',
    fileName: 'ionicfile.jpg',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }

  fileTransfer.upload(this.imageURI, this.apiUrl+"perfilsave", options).then(data => {
      console.log(data + "Su subida ha sido excitosa");
      this.imageFileName = "ionicfile";
      loader.dismiss();
      this.presentToast("La imagen subio exitosamente");
    }, err => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
}
presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


  ionViewDidLoad() {
    console.log("ionViewDidLoad PerfilPage");
  }
}
 */