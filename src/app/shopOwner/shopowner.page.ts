import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from "src/app/services/shared.service";
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController } from "@ionic/angular";
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: "app-superadmin",
  templateUrl: './dashboard.page.html',
  styleUrls: ['./shopowner.page.scss'],
})
export class ShopOwnerPage implements OnInit {
  data: any;
  id: any;
   

  constructor(
   public sharedservice: SharedService,
   private loginservice: LoginService,
   private toastService: ToastService,
   private loadingController: LoadingController,
   private router:Router,
  ) {}

  ngOnInit() {
    this.GetShopOwnerData(this.sharedservice.user.sid);
  }

    
    async GetShopOwnerData(id){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.loginservice.GetShopOwnerData(id).subscribe(
      res => {
        loading.dismiss();
        if (res){
          loading.dismiss();
          console.log(res);
          this.data = res;
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
  Onclick()
  {
    this.router.navigateByUrl('shopowner/shops/add');

  }

  OrdersClick()
  {
    this.router.navigateByUrl('shopowner/order/new');
  
  }
  Onclick1()
  {
    this.router.navigateByUrl('shopowner/shops');
  }
  Onclick3(){
    this.router.navigateByUrl('shopowner/list-of-product');
  }
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  }
 

