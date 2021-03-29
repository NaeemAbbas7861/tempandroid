
  import { Component, OnInit } from "@angular/core";
  import { environment } from "src/environments/environment";
  import { SharedService } from "src/app/services/shared.service";
  import { OrderService } from 'src/app/services/order.service';
  import { LoadingController } from '@ionic/angular';
  import { Router } from '@angular/router';
  
  @Component({
    selector: "app-superadmin",
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
  })
  export class Dashboard implements OnInit {
      data:any;
      event:any;
    constructor(
     public sharedservice: SharedService,
     public orderservice: OrderService,
     public loadingController: LoadingController,
     private router:Router,
    ) {}
  
    ngOnInit() {
      this.data= console.log(this.sharedservice.user);
    }
    
    Onclick(){
      this.router.navigateByUrl('rider/orders/new');
    }
    Onclick1(){
      this.router.navigateByUrl('rider/orders/pending');
    }
    Onclick2(){
      this.router.navigateByUrl('rider/orders/complete');
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
  