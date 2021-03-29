import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/app/services/toast.service';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-myshops',
  templateUrl: './view-orders.page.html',
  styleUrls: ['./view-orders.page.scss'],
})
export class OrderPageOwner implements OnInit {

  orders: any
  today: any;
  searchQuery: any;
  userId;
  private allorders = [];
  orderid: number;
  type = this.route.snapshot.paramMap.get('type');
  NotOrderFound: boolean = false;


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

    
    this.Allorders();
}

async Allorders()
{
  const loading = await this.loadingController.create({ message: "Loading" });
  await loading.present();
   await this.orderservice.Allorders().subscribe(
      res=>{
        loading.dismiss();
        this.orders = res;
        this.allorders=res;
        console.warn(res);
        err => {
          console.log(err);
          loading.dismiss();
        }   
         });
  
}
async Singleorders(id)
{
  console.log(id);
  const loading = await this.loadingController.create({ message: "Loading" });
  await loading.present();
  if(!id)
  {
    loading.dismiss();
    this.doRefresh(event);
  }
 else{
  await this.orderservice.GetOrder(id).subscribe(
  res => {
    loading.dismiss();
    if (res) {
     this.orders =[res];
    } else {
     
    }
  },
  err => {
    loading.dismiss();
     this.toastService.create("Invalid Order ID", "danger");
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


  search() {
    console.log("Order", this.orders)
    this.orders = this.allorders.filter(Item => Item.id.toLowerCase().includes(this.searchQuery.toLowerCase()));  
    if(this.orders.length == 0)
    {
      this.NotOrderFound = true;
    }
    else
    this.NotOrderFound = false;

  }
}

  
