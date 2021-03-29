import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-myshops',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
   inputs: ['recieved_data']
})
export class ProductPageOwner implements OnInit {

  shop: any;
  id = this.route.snapshot.paramMap.get('id');
  allproducts :any;
  searchQuery: any;
  shopproducts: any;
  NotShopFound: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public shopservice: ShopService,
    public loadingController: LoadingController,
  //  private events: Events,
    private toastService: ToastService,
    private router: Router
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
     await this.shopservice.GetShopProducts(this.id).subscribe(
        res=>{
          loading.dismiss();
          if(res)
          {
          console.log(res);
          this.allproducts = res;
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
    // await loading.present();
     await this.shopservice.GetShopProducts(id).subscribe(
        res=>{
          loading.dismiss();
          if(res)
          {
          console.log(res);
          this.shop = res;
          this.shopproducts=res.products;
          console.log(this.shopproducts);
          if (res.products.length >= 1) {
            this.NotShopFound = false;
          }
          else{
            this.NotShopFound = true;
          }
          }
          else{
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
      });
    }

    async DeleteProduct(id){
      const loading = await this.loadingController.create({ message: "Loading" });
      // await loading.present();
      console.log(id);
       await this.shopservice.DeleteProductbyId(id).subscribe(
          res=>{
            loading.dismiss();
            if(res)
            {
            console.log(res);
            this.toastService.create("Deleted", "success");
            this.router.navigate(['shopowner/shops/']);
            }
        }, err => {
          console.log(err);  
        }
      );
      }
  

    preview(id)
    {
      this.router.navigateByUrl('productdetail/'+id+'/true');
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
      this.shop.products = this.allproducts.products.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));  
    }

}
