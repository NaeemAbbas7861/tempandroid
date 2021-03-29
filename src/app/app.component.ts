/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';
import { SharedService } from 'src/app/services/shared.service';
import { FunctionsService } from './functions.service';
import { Storage } from '@ionic/storage';
import {  Router} from "@angular/router";
import { environment } from 'src/environments/environment';
import {Location} from '@angular/common';
import {Plugins} from '@capacitor/core';
const {App} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.page.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, {static:true}) routerOutlet:IonRouterOutlet; 

  side_open = true;
  side_open1 = true;
  isloggedin = false;
  RESOURCE = environment.RESOURCE_URL;
// if (this.sharedservice.user) {
 
// this.appPages = [
//     { title: 'Browse', url: '/home', icon: 'home' },
//     { title: 'Search', url: '/search', modal: true, icon: 'search' },
//     { title: 'Notifications', url: '/notification', icon: 'notifications' },
//     { title: 'Groups', url: '/superadmin/group', icon: 'notifications' },
//   ];
// }
 

  // public appPages = [
  //   { title: 'Browse', url: '/home', icon: 'home' },
  //   { title: 'Search', url: '/search', modal: true, icon: 'search' },
  //   { title: 'Notifications', url: '/notification', icon: 'notifications' },
  //   { title: 'Groups', url: '/superadmin/group', icon: 'notifications' },
  //   { title: 'Shopping Cart', url: '/cart', icon: 'cart' },
  //   { title: 'Order History', url: '/orders', icon: 'list' },
  //   { title: 'Wish Cash', url: '/wishcash', icon: 'wallet' },
  //   { title: 'Rewards', url: '/rewards', icon: 'trophy' },
  //   { title: 'Apply Promo', url: '/applypromo', icon: 'megaphone' }
  // ];

  public appPages1 = [
  //  { title: 'Customer Support', url: '/support', icon: 'people' },
    { title: 'FAQs', url: '/faqs', icon: 'help-circle' },
    { title: 'Settings', url: '/settings', icon: 'cog' }
  ];

  colors = [
    'Bronze',
    'Black',
    'Blue',
    'Clear',
    'Gold',
    'Gray',
    'Green',
    'Multi-Color',
    'Orange',
    'Pink',
    'Red',
    'Silver',
    'White',
    'Yellow',
    'Brown',
    'Purple',
    'Beige'
  ];

  menu(b){
    if(b){
      this.side_open = false;
      this.side_open1 = true;
    }
    else {
      this.side_open = false;
      this.side_open1 = false;
    }
  }

 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dataService: DataService,
    public fun: FunctionsService,
    private sharedservice: SharedService,
    private storage: Storage,
    private route:Router,
    private location: Location,
    private alertController: AlertController,
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  backButtonEvent(){
    this.platform.backButton.subscribeWithPriority(10, ()=>
    {
      if(!this.routerOutlet.canGoBack())
      {
        this.backButtonAlert();
      }
      else{
        this.location.back();
      }
    });
   }
    async backButtonAlert()
    {
    const alert= await this.alertController.create({
    message: 'Do you want to close your App',
    buttons: [{
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Close App',
      handler: ()=>
      {
        navigator['app'].exitApp();
      }
    }]
    });
    await alert.present();
    }


  ionViewDidEnter() 
  {
    this.storage.get("User").then(value=> {
      if(value)
      {this.sharedservice.UpdateUser(value);
        this.sharedservice.updatelogin(true);
      this.isloggedin = true;
      }
      
      
    });
  }

 

  initializeApp() {
    this.platform.ready().then(() => {    
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
    this.storage.get("User").then(value=> {
      if(value)
      {this.sharedservice.UpdateUser(value);
       this.sharedservice.updatelogin(true);
      this.isloggedin = true;
      }
    });
  }
  logout()
  {
    this.storage.clear();
    this.sharedservice.updatelogin(false);
     this.route.navigateByUrl('/login');
  }


}
