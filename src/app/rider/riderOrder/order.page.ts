import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-riderorder',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPageRider implements OnInit {

  orders: any
  today: any;
  event:any;
  userId;
  OrderNotFound: boolean = false;
  type = this.route.snapshot.paramMap.get('type');

  constructor(
    public route: ActivatedRoute,
    public orderservice: OrderService,
    private router: Router,
    public loadingController: LoadingController,
  //  private events: Events,
    private toastService: ToastService,
    private geolocation: Geolocation,
    private storage: Storage,
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }
  ionViewWillEnter(){
    this.doRefresh(event);
  
 }

  async ngOnInit() { 
    await this.storage.get("User").then(value=>{
      this.userId = value.sid;
    });
    if (this.type == 'new')
    {
      this.geolocation
        .getCurrentPosition()
        .then(resp => {
          this.getNewOrders(resp.coords.latitude , resp.coords.longitude);
        })
        .catch(error => {
          console.log("Error getting location", error);
        });   
      }

      if (this.type == 'pending')
      {
      this.getRiderOrdersByStatus(this.userId, 1);
       
      }
     
      if (this.type == 'completed'){
      this.getRiderOrdersByStatus(this.userId , 2);
      
    }
  }
  

  async getNewOrders(lat , lng) {
   
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.orderservice.GetNewRiderOrders(lat , lng).subscribe(
      res => {
        console.log(res);
        if (this.type == 'new' )
        {
        this.orders = res;
        if(this.orders.length == 0)
          {
              this.OrderNotFound=true;
        }
       
        }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async getRiderOrdersByStatus(riderId , status) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.orderservice.GetRiderOrdersByStatus(riderId , status).subscribe(
      res => {
        console.log(res);
        this.orders = res;
        if(this.orders.length ==0)
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
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  async acceptOrder(orderid , status){  
    if (this.orders)
    {
      const loading = await this.loadingController.create({ message: "Loading" });
      await loading.present();
        await this.orderservice.AcceptOrder(orderid , this.userId , status)
        .subscribe(res => {        
            loading.dismiss();
            if (status == 1)
            {
            this.toastService.create("Order Accept successfully", 'success');
            this.router.navigate(['/rider/orders/pending/'+orderid+'/items']);
            }
            else
            this.router.navigate(['/rider/orders/completed']);
        }, (err) => {
          loading.dismiss();
          console.log(err)
          this.toastService.create(err, 'danger');
        });
       }
    }



}
