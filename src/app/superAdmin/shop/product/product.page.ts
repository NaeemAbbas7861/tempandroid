import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-myshops',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageAdmin implements OnInit {

  shop: any;
  searchQuery: any;
  id = this.route.snapshot.paramMap.get('id');
  allproducts: any;

  constructor(
    public route: ActivatedRoute,
    public shopservice: ShopService,
    public loadingController: LoadingController,
  //  private events: Events,
    private toastService: ToastService
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
     await this.shopservice.GetShopProducts(this.id).subscribe(
        res=>{
          loading.dismiss();
          if(res){
          // console.log(res);
          this.shop = res;
          }
          else{
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
      });
    }
  ionViewWillEnter(){
    this.GetShopProducts(this.id);
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
          }
          else{
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
      });
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
      this.allproducts.product = this.allproducts.product.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));   
    }

}
