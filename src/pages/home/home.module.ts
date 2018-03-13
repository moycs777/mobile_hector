import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule { }
