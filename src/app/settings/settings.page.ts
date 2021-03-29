/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { InfomodalPage } from '../infomodal/infomodal.page';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  items = [
    { name: 'Account Settings', url: 'accountsettings' },
    { name: 'Other Settings', url: 'accountsettings' },
    
  ];

  constructor(private navCtrl: NavController, private fun: FunctionsService, private menuCtrl: MenuController, private page: NavController, private dataService: DataService, private modalController: ModalController , private storage: Storage) { }

  ngOnInit() {
    this.storage.get("User").then(value=> {
      if(value)
      {this.items =  [
        { name: 'Account Settings', url: 'accountsettings' },
        //{ name: 'Logout', url: 'login' }
      ];}
    });
  }
  
  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
  }

  nav(i){
      this.navCtrl.navigateForward('/'+this.items[i].url);
  }

  // logout(){
  //   this.storage.clear();
  //   this.page.navigateRoot('/login');
  // }

  async open_modal(b){
    let modal;
    if(b){
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.dataService.terms_of_use, title: 'Terms of Use' }
      });
    }
    else{
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.dataService.privacy_policy, title: 'Privacy Policy' }
      });
    }
    return await modal.present();
  }

}
