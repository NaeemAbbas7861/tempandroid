/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 *
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cart, DataService } from '../data.service';
import { FunctionsService } from '../functions.service';
import { InfomodalPage } from '../infomodal/infomodal.page';
import { ModalController, IonList, NavController, MenuController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  env = environment;
  show = true;
  @ViewChild('slidingList') slidingList: IonList;

  customAlertOptions: any = {
    header: 'Select Quantity',
    translucent: true
  };

  qty = [];
  code = '';
  data: Array<Cart> = [];
  items = [];
  total:number;
  shipping = 100;

  constructor(
    private menuCtrl: MenuController,
    public dataService: DataService,
    public fun: FunctionsService,
    private modalController: ModalController,
    private storage: Storage,
    private nav: NavController,
    public alertController: AlertController) {
   
  }

  ngOnInit() {}

}
