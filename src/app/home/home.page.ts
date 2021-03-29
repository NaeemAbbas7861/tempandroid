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
import { MenuController, IonSlides } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { DataService, HomeTab, Product } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { GroupService } from 'src/app/services/group.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { environment } from 'src/environments/environment';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { type } from 'os';
import { ReadPropExpr } from '@angular/compiler';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('Slides') slides: IonSlides;

  segment = '';
  index = 0;
  x: number;
  searchQuery: any;
  data: Array<HomeTab> = [];
  sponsored: Array<Product> = [];
  product_data_1: Array<Product> = [];
  product_data_2: Array<Product> = [];
  slideOpts = {
    effect: 'flip',
    zoom: false
  };
  shops:any;
  groups: any;
  groupid: any;
  env = environment;
  Latitude: number;
  Longitude: number;
  NotFound: boolean = false;
  location: boolean = true;
  private allshops = [];
  getshopbyname: any;

  constructor(
  
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: DataService,
    private router: Router,
    private shopservice: ShopService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private sharedservice: SharedService,
    private groupservice: GroupService,
    private geolocation: Geolocation,
    private storage: Storage,
    ) {
    this.data = dataService.tabs;
    const d = this.activatedRoute.snapshot.paramMap.get('id');
    if (d) {
      this.segment = this.data[parseInt(d, 10)].title;
    } else {
      this.segment = this.data[0].title;
    }
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
    if(this.sharedservice.user.RoleName == 'SuperAdmin')
    this.router.navigate(['superadmin/dashboard'])
    else if(this.sharedservice.user.RoleName == 'ShopOwner')
    this.router.navigate(['shopowner/dashboard'])
    else if(this.sharedservice.user.RoleName == 'Rider')
    this.router.navigate(['rider/dashboard'])
    else if(this.sharedservice.user.RoleName=='Customer')
    {
        this.getUserLocation();
    } 
  }

  seg(event) {
    this.segment = event.detail.value;
  }

  drag() {
    let distanceToScroll = 0;
    for (let index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  preventDefault(e) {
    e.preventDefault();
  }

   async ngOnInit() {
     
   }
  async change() {
    await this.slides.getActiveIndex().then(data => this.index = data);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  side_open() {
    this.menuCtrl.toggle('end');
  }

  update(i) {
    this.slides.slideTo(i).then((res) => console.log('responseSlideTo', res));
  }

  async getUserLocation() {
    const loading = await this.loadingController.create({ message: "Getting location" });
    await loading.present();
    this.geolocation
      .getCurrentPosition( {maximumAge: 60000, timeout: 4000, enableHighAccuracy: true} )
      .then(resp => {
        loading.dismiss();
        this.location = true;
        this.Latitude = resp.coords.latitude;
        this.Longitude = resp.coords.longitude;
        console.log("Latitude", this.Latitude,"Longitude", this.Longitude );
        this.getShops('all' , this.Latitude, this.Longitude);
        this.getGroups();
      })
      .catch(error => {
        console.log("Error getting location", error);
        this.location = false;
        loading.dismiss();
      });
  }

  async getShops(type, lat, lng) {
      const loading = await this.loadingController.create({ message: "Loading" });
      await loading.present();
    
  
     if (type == 'all'){
      await this.shopservice.GetShops(lat, lng).subscribe(
        res => {
          loading.dismiss();
          if (res) {
           console.log(res);
           this.shops = res;
           this.allshops=res;
           this.storage.set("customerLat" ,  lat);
           this.storage.set("customerLong", lng);
            //  this.ngOnInit();
          } else {
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
        },
        err => {
          loading.dismiss();
          this.toastService.create(err, "danger");
        }
      );
  }
  else {
    await this.shopservice.GetShopsByCategory(type , lat, lng).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.shops = res;
         this.allshops=res;
          //  this.ngOnInit();
        } else {
          loading.dismiss();
          this.toastService.create(res.Message, "danger");
        }
      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }
    }

    async getGroups() {
      const loading = await this.loadingController.create({ message: "Loading" });
      await loading.present();
      await this.groupservice.GetGroups().subscribe(
        res => {
          loading.dismiss();
          if (res) {
           this.groups = res;
          } else {
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
        },
        err => {
          loading.dismiss();
          this.toastService.create(err, "danger");
        }
      );
    }
    doRefresh(event) {
      console.log('Begin async operation');
      this.ionViewDidEnter();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 1000);
    }
    search() {
      this.shops = this.allshops.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));  
      if(this.shops.length == 0)
      {
        this.NotFound = true;
      }
      else
      this.NotFound = false;

    }
}
