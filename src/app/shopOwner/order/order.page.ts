import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-myshops',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPageOwner implements OnInit {

  orders: any
  today: any;
  userId;
  OrderNotFound: boolean = false;
  type = this.route.snapshot.paramMap.get('type');


  constructor(
    public route: ActivatedRoute,
    public orderservice: OrderService,
    public loadingController: LoadingController,
  //  private events: Events,
    private storage: Storage,
    private toastService: ToastService
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  async ngOnInit()
{

    await this.storage.get("User").then(value=>{
      this.userId = value.sid;
    });
    this.getOrdersByUser(this.userId);
}

  async getOrdersByUser(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    if (this.type=='new')
    {
    await this.orderservice.GetNewUserShopOrders(id).subscribe(
      res => {
        console.log(res);
        this.orders = res;
        if(this.orders.length == 0)
        {
            this.OrderNotFound=true;
      }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
    }
    else if (this.type=='pending')
    {
      await loading.present();
    await this.orderservice.GetPendingUserShopOrders(id).subscribe(
      res => {
        console.log(res);
        this.orders = res;
        if(this.orders.length == 0)
        {
            this.OrderNotFound=true;
         }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
    }
    else if (this.type=='complete')
    {
    await this.orderservice.GetCompleteUserShopOrders(id).subscribe(
      res => {
        console.log(res);
        this.orders = res;
        if(this.orders.length == 0)
        {
            this.OrderNotFound=true;
         }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
    }
    else if(this.type=='cancel') 
    {
    await this.orderservice.GetCancelUserShopOrders(id).subscribe(
      res => {
        console.log(res);
        this.orders = res;
        if(this.orders.length == 0)
        {
            this.OrderNotFound=true;
         }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
    }


  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}

  
