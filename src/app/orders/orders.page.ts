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
import { MenuController, ModalController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { DataService, Orders } from '../data.service';
import { OrderinfoPage } from '../orderinfo/orderinfo.page';
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { AlertService } from '../services/alert.service';
import { TermsPageModule } from '../terms/terms.module';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {


  orders: any;
  sid;
  status:any;
  isloggedin = false;
  constructor(
    private menuCtrl: MenuController, 
    private modalController: ModalController,
    private fun: FunctionsService, 
    private dataService: DataService,
    private orderservice: OrderService,
    private loadingController: LoadingController,
    private toastService: ToastService,
    public route: ActivatedRoute,
    public router: Router,
    public storage: Storage,
    public sharedservice: SharedService,
    public alertController:AlertController,
    
    )
     {
    //this.orders = dataService.orders;
  }

  ngOnInit() {
    this.storage.get("IsLoggedIn").then(value=>{
      if (value)
      if(value==true)
      {
        this.isloggedin==true;
      }
      console.log(value);
      if(value== null)
      {
        this.toastService.create("Plese login and view orders details", 'danger');
      }
      else
      this.GetCustomerOrder(this.sid); 


    });
     
}
  
  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');
   
  }

  async open(order: Orders){
    let modal = await this.modalController.create({
      component: OrderinfoPage,
      componentProps: { value: order }
    });
    return await modal.present();
  }


  async GetCustomerOrder(sid)
  {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.orderservice.GetCustomerOrder(this.sharedservice.user.sid).subscribe(
        res=>{
          loading.dismiss();
          if(res){
          console.log(res);
          this.orders = res; 
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
  async presentAlertConfirm(sid) {
    const alert = await this.alertController.create({
      header: 'Are you Sure?',
      message: 'Do you receive this Order?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
                  this.MarksReceived(sid);
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

  async MarksReceived(id){
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.orderservice.MarksReceived(id).subscribe(
        res=>{
          loading.dismiss();
            console.log(res);
            // this.toastService.create(res.Message, "danger");
            
      });
      (err) =>{
        loading.dismiss();
        console.log(err)
        this.toastService.create(err, 'danger');
      }

  }

  browse(){
    this.router.navigateByUrl("login");
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  } 



  async CancelorderStatus(sid) {
    const alert = await this.alertController.create({
      header: 'Are you Sure?',
      message:  'Do you want to cancel this Order?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
                  this.CancelOrder(sid, status);
               
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




  async CancelOrder(id, status)
  {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    status=3;
     await this.orderservice.CancelOrder(id , status).subscribe(
        res=>{
          loading.dismiss();
          console.warn(res);
          this.toastService.create('Order Cancel request succeded'); 
          this.router.navigate(['orders']);
          this.doRefresh(event);
          err => {
            console.log(err);
            loading.dismiss();
          }     
         });
    
  }
  
}
