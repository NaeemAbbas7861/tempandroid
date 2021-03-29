/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 *
 */
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cart, DataService } from '../data.service';
import { FunctionsService } from '../functions.service';
import { InfomodalPage } from '../infomodal/infomodal.page';
import { ModalController, IonList, NavController, MenuController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  env = environment;
  show = true;
  Exchange= false;
  isReturnable;
  @ViewChild('slidingList') slidingList: IonList;

  customAlertOptions: any = {
    header: 'Select Quantity',
    translucent: true
  };

  AvaliableQty = [];
  code = '';
  event:any
  price: any;
  data: Array<Cart> = [];
  items = [];

  returnquantities=[];
  total:number;
  shipping = 100;
  quantity: number = 1;
  returnQuantity :number=0;
  returndiscount: number;
  returndiscountitem: any;
  returnitem: any;
  discount: any;
  deliveryCharges = 100;
  Delivery_Address: any;
  ReturnedProductId: any;

  constructor(
    private menuCtrl: MenuController,
    public dataService: DataService,
    public fun: FunctionsService,
    private modalController: ModalController,
    private storage: Storage,
    private route: ActivatedRoute,
    private orderservices: OrderService,
    private nav: NavController,
    private loadingController: LoadingController,
    private  toastService: ToastService,
    public alertController: AlertController) {
    // this.data = dataService.cart;
    // if (this.data.length === 0) { this.show = false; }
    // for (let i = 1; i <= 36; i++) { this.AvaliableQty.push(i); }
  }

  ngOnInit() {
    this.storage.get("Cart").then(value=> {
      if(value)
      {
        console.log(value.length);
         this.items = value;
         if (value.length === 0) {
          this.show = false;
        }
        else{
        this.show = true;
        value.forEach(element => {
          if (!element.dropdown)
          {
          element.dropdown = [];
          for (let i = 1; i <= element.AvaliableQty; i++) {
            element.dropdown.push(i);
           } 
          }else{
            element.dropdown;
          }
         
          //for return quantity
          for (let j = 1; j <= element.quantity; j++) {
            this.returnquantities.push(j);
           } 
          //
                    
        });
       
        }
         console.log(this.items);
         this.total = this.calculatetotal(this.items);
         this.storage.set("TotalAmount",(this.total));
         this.storage.set("deliveryCharges", this.deliveryCharges);
        
      }
      else{
        this.show = false;
      }
     });
     this.Getreturnedproduct();
  }
   ionViewWillEnter(){
     this.doRefresh(event);
   
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
    this.storage.get("isReturnable").then(value=>
      {
        this.isReturnable=value;
        console.log(this.isReturnable);
  });
  }

  async open_modal(b) {
    let modal;
    if (b) {
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.dataService.terms_of_use, title: 'Terms of Use' }
      });
    } else {
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.dataService.privacy_policy, title: 'Privacy Policy' }
      });
    }
    return await modal.present();
  }

  // calculate(i) {
  //   let res = 0;
  //   if (i === 0) {
  //     for (const j of this.data) {
  //       if (j.product.offer) {
  //         res += this.fun.calculate(j.product.cost_price, j.product.discount) * j.quantity;
  //       } else {
  //         res += j.product.cost_price * j.quantity;
  //       }
  //     }
  //   }
  //   if (i === 1) {
  //     for (const j of this.data) {
  //       res += j.product.shipping;
  //     }
  //   }
  //   return res;
  // }
  crazyEvent(){ 
      console.log(this.returnitem);
      this.storage.set("ReturnQuantity", this.returnQuantity );
      this.returndiscount = this.returnitem.price * this.returnQuantity;
      this.returndiscount = Math.round(this.returndiscount);
      console.log(this.returndiscount);
      this.storage.set("ReturnDiscount", this.returndiscount );
      this.storage.set("ReturnedProductId", this.returnitem.id );


  }

  fix(a) {
    return a.toFixed(2);
  }

  // add() {
  //   const res = this.calculate(1) + this.calculate(0);
  //   return res;
  // }

  browse() {
    this.fun.navigate('/home', false);
  }
  async remove(j) {
    this.fun.removeConform().then(res => {
      console.log('res conform', res);
      if (res === 'ok') {
        this.slidingList.closeSlidingItems();
       this.items.splice(j, 1);
       this.storage.set("Cart", this.items);
        if (this.items.length === 0) {
          this.show = !this.show;
        }
      }
    });
  }

 
 updatequantity(productid , quantity){
  
       this.items.forEach(element => {
         if(element.productId == productid)
         {
           element.quantity = quantity;
         }
         
       });
       console.log(this.items);
       this.storage.set("Cart", this.items);
       this.total = this.calculatetotal(this.items);
       this.storage.set("TotalAmount",(this.total));

       if (this.returnitem  &&  quantity < this.returnQuantity )
       {
        this.returnQuantity=1;
        this.crazyEvent();
       }
       
       this.returnquantities = [];
       for (let j = 1; j <= quantity; j++) {
        this.returnquantities.push(j);
       } 
  
 }
  calculatetotal(cart) {
    let total = 0;
    cart.forEach(element => {
      total += (element.price -(element.price/100 )*element.discount) * element.quantity
    });
    return total;
  }

  doRefresh(event) {
    
    this.ngOnInit();
    setTimeout(() => {

      event.target.complete();
    }, 1000);
  }


  async Getreturnedproduct()
  {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.orderservices.Getreturnedproduct().subscribe(
        res=>{
          loading.dismiss();
          if(res){
          console.log(res);
          this.returndiscountitem = res; 
        
          }
          else{
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
      });
      (err) =>{
        loading.dismiss();
        console.log(err)
        this.toastService.create(err, 'danger');
      }

  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Are you Sure?',
      message: 'Do you want to Buy this Product?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // this.storage.set("Delivery_address", this.Delivery_Address);
                  this.fun.checkout();
                  console.log('Confirm Okay:');
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
}
