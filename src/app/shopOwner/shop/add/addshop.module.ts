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
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { AddShopPage } from './addshop.page';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: '',
        component: AddShopPage
      }
    ])
  ],
  declarations: [AddShopPage
  ],
  providers:[Geolocation , FileChooser , File ,FilePath, FileTransfer],
  entryComponents: []
})
export class AddShopPageModule {}
