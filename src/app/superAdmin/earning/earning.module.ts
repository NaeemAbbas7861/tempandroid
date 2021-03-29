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
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EarningPage } from './earning.page';
import {Downloader} from "@ionic-native/downloader/ngx"
const routes: Routes = [
  {
    path: '',
    component: EarningPage
  }
];

@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild(routes)
  ],
  
  
  
  declarations: [EarningPage],
  providers: [Downloader]
})
export class EarningPageModule {}
