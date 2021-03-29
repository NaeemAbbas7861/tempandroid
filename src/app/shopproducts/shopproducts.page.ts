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
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shopproducts',
  templateUrl: 'shopproducts.page.html',
  styleUrls: ['shopproducts.page.scss'],
})
export class ShopProductsPage {

  @ViewChild('Slides') slides: IonSlides;

  segment = '';
  index = 0;
  data: Array<HomeTab> = [];
  sponsored: Array<Product> = [];
  slideOpts = {
    effect: 'flip',
    zoom: false
  };
  shop: any;
  products: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController,
    public alertController:AlertController,
    private nav: NavController,
    private fun: FunctionsService,
    private dataService: DataService,
    private shopservice: ShopService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private storage: Storage) {
    this.data = dataService.tabs;
    
    // this.product_data_2 = dataService.products_2;
    // const d = this.activatedRoute.snapshot.paramMap.get('id');
    // if (d) {
    //   this.segment = this.data[parseInt(d, 10)].title;
    // } else {
    //   this.segment = this.data[0].title;
    // }
  }

  async ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(true, 'end');
    let id = this.route.snapshot.paramMap.get('id');
    this.GetShopProducts(id);
   // this.storage.set("ShopId" , id);
    this.storage.get("ShopId").then(async value=>
      {
        console.log(value);
        if (value == null)
    this.storage.set("ShopId" , id);
    else if (id != value){
      this.storage.get("Cart").then(async value=>{
       
          
          if(value.length > 0)
          {
            const alert =await this.alertController.create({
              header: 'Are you Sure?',
              message: 'Do you want to clear previous shop order?',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    console.log('Confirm Okay:');
                    this.storage.remove('Cart');
                    this.storage.remove('TotalAmount');
                    this.storage.set("ShopId" , id);
                  }
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                  }
                }
              ]
            });
            await alert.present();
          }
        
      });
        
      
    
    }
      });
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
  
 async GetShopProducts(id){
  const loading = await this.loadingController.create({ message: "Loading" });
  await loading.present();
   await this.shopservice.GetShopProducts(id).subscribe(
      res=>{
        loading.dismiss();
        if(res){
        // console.log(res);
        this.shop = res;
        this.products = this.shop.products.filter(x=>x.quantity > 0);
        console.log(res);
        this.storage.set("isReturnable" , this.shop.isReturnable);
        console.log(this.shop.isReturnable);
        }
        else{
          loading.dismiss();
          this.toastService.create(res.Message, "danger");
        }
    });
  }
}
