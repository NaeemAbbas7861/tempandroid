import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  activeCustomer: any;
  disabledCustomer: any;
  activeShopowner: any;
  disabledShopOwner: any;
  filtercart=[];
  customer:any;
  id :any;
  type: string;
  shopowner:any;
  constructor(
    private loadingController:LoadingController,
    public route: ActivatedRoute,
    public api: LoginService,
    public toastServices: ToastService,
  
  ) { }

  ngOnInit() {
    this.getCustomer();
    this.GetShopOwner();
    this.type = 'ActiveCustomer';
  }


  async getCustomer() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.GetUserData(3).subscribe(

      res => {
        console.log(res,"Customers");
        this.customer = res;
        // this.products = this.shop.products.filter(x=>x.quantity > 0);
        this.disabledCustomer     = this.customer.filter(x=> x.isDisabled==true);
        console.log(this.activeCustomer);
        this.activeCustomer = this.customer.filter(x=> x.isDisabled!=true );
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  async GetShopOwner() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    await this.api.GetUserData(2).subscribe(
      res => {
        console.log(res,"shopowner");
        this.shopowner = res;
        this.disabledShopOwner     = this.shopowner.filter(x=> x.isDisabled==true);
        console.log("Disabled Shopowners", this.disabledShopOwner );
        this.activeShopowner= this.shopowner.filter(x=> x.isDisabled!=true );
        console.log("Active Shopowners",this.activeShopowner);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
   segmentChanged(ev: any) {  
  }
 async UpdateUserStatus(id){
  const loading = await this.loadingController.create({ message: 'Loading' });
  await loading.present();

  await this.api.UpdateUserStatus(id).subscribe(
    res => {
      console.log(res);
      this.toastServices.create('Changed successfully');
      this.doRefresh(event);
      loading.dismiss();
    },
    err => {
      console.log(err);
      loading.dismiss();
    }
  );

 }

}
