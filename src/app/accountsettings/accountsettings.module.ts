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
import { AccountsettingsPage } from './accountsettings.page';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {File} from '@ionic-native/file/ngx'; 
import { IonicModule } from '@ionic/angular';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { FormsModule , ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AccountsettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountsettingsPage],
  providers:[File , FileChooser , FileTransfer , FilePath]
})
export class AccountsettingsPageModule {}
