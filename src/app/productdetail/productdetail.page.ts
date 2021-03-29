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
import { FunctionsService } from '../functions.service';
import { DataService, Product, HomeTab } from '../data.service';
import { IonSlides, MenuController, NavController, IonContent } from '@ionic/angular';
import{ShopService} from 'src/app/services/shop.service';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import {Cart} from 'src/app/_models/cart';
import { Toast } from '@capacitor/core';


@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {

  @ViewChild('Slides') slides: IonSlides;
  @ViewChild('Content') content: IonContent;
  @ViewChild('slider') slider: IonSlides;

  index = 0;
  segment = '';
  slideOpts = {
    effect: 'flip',
    zoom: false
  };
  cart = [];
  newProduct = new Cart();

  data: Array<HomeTab> = [];

  product: any;
  viewType: any;
  filtercart=[];
  avaliableQty:any;
  constructor(
    private menuCtrl: MenuController,
    private fun: FunctionsService,
    private dataService: DataService,
    private shopservice: ShopService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private storage: Storage,
    private route: ActivatedRoute,
    private nav: NavController) {

   // this.product = dataService.current_product;
    this.data = dataService.item_tab;
    this.segment = this.data[0].title;
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.viewType = this.route.snapshot.paramMap.get('preview');
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }

  async change() {
    await this.slides.getActiveIndex().then(d => this.index = d);
    this.segment = this.data[this.index].title;
    this.drag();
  }

  goToCart() {
    this.fun.navigate('cart', false);
  }

  update(i) {
    this.slides.slideTo(i);
  }

  drag() {
    let distanceToScroll = 0;
    for (const index in this.data) {
      if (parseInt(index) < this.index) {
        distanceToScroll = distanceToScroll + document.getElementById('seg_' + index).offsetWidth + 24;
      }
    }
    document.getElementById('dag').scrollLeft = distanceToScroll;
  }

  seg(event) {
    this.segment = event.detail.value;
  }

  async getProduct(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();

    await this.shopservice.GetProductDetail(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log("prod",res);
         this.product = res;
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
//  async AddToCart(product) {

//    console.log(product);
//    await this.storage.get("Cart").then(value=> {
//       if(value)
//       {
// console.log(value);
// this.cart = value;
// console.log(this.cart);
// this.cart.push(product);
// this.storage.set("Cart", this.cart);
//       }
//       else{
//         this.cart.push(product);
//         this.storage.set("Cart", this.cart);   
//       }
//     }  
//       );
//       this.goToCart();
//   }
async AddToCart(product) {
  this.newProduct.productId = product.id;
  this.newProduct.title = product.title;
  this.newProduct.description = product.description;
  this.newProduct.productDetail = product.productDetail;
  this.newProduct.productCode = product.productCode;
  this.newProduct.price = product.price;
  this.newProduct.discount= product.discount;
  this.newProduct.unit = product.unit;
  this.newProduct.weight = product.weight;
  if(product.images[0])
  this.newProduct.imagepath = product.images[0].path;
  this.newProduct.AvaliableQty=this.product.quantity;
  this.newProduct.quantity = 1;
  // console.log(this.newProduct);
  await this.storage.get("Cart").then(value=> {
     if(value)
     {
      this.cart = value;
      this.filtercart=this.cart.filter(x=>x.productId===this.newProduct.productId);
      console.log(this.newProduct,'new');
      console.log(this.filtercart,'filter');
            if(this.filtercart.length>0)  
                {
                  for(var i=0;i<this.cart.length;i++)
                    {
                     if(this.cart[i].productId==this.newProduct.productId )
                         {
                            console.log(this.cart[i].quantity,this.newProduct.AvaliableQty,'check')
                            if(this.cart[i].quantity < this.newProduct.AvaliableQty)
                               {          
                             this.cart[i].quantity=1;
                                }
                             else{
                                this.toastService.create("limit arrived", "danger");
                                  }
                          }
                    }             
            this.storage.set("Cart", this.cart);
            this.goToCart();
                 } 
        else{
      
        this.cart.push(this.newProduct);
        this.storage.set("Cart", this.cart);
        this.goToCart();
          }
    }
  else{
  this.cart.push(this.newProduct);
  this.storage.set("Cart", this.cart);
  this.goToCart();
      }    
   }  );
 }
}
