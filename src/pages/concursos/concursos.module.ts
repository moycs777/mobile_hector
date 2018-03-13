import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcursosPage } from './concursos';

@NgModule({
  declarations: [
    ConcursosPage,
  ],
  imports: [
    IonicPageModule.forChild(ConcursosPage),
  ],
})
export class ConcursosPageModule {}
