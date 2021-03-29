/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CheckoutPage } from './checkout.page';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';


const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckoutPage],
   providers:[Geolocation , FileChooser , File ,FilePath, FileTransfer],
  entryComponents: []
})
export class CheckoutPageModule {}


