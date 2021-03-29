import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-list-of-product',
  templateUrl: './list-of-product.page.html',
  styleUrls: ['./list-of-product.page.scss'],
})
export class ListOfProductPage implements OnInit {
  userId: any;
  product:any;
  shopproducts: any;
  searchQuery: any;
  allproducts: any;


  constructor(private storage: Storage,
    public shopservice: ShopService,
    public loadingController: LoadingController,
    private toastService: ToastService,) { }

  async ngOnInit() {

    this.storage.get("User").then(value=> {
      this.userId = value.sid;
     console.log("Sid", this.userId);
     this.GetShopProducts(value.sid);
    });
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
     await this.shopservice.GetShopProducts( this.userId).subscribe(
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
  

  async GetShopProducts(id){
    const loading = await this.loadingController.create({ message: "Loading" });
     await loading.present();
     await this.shopservice.GetShopByuserProducts(id).subscribe(
        res=>{
          loading.dismiss();
          if(res)
          {
          console.log(res);
          this.product = res;
          this.shopproducts=res;
          console.log(this.shopproducts);
          }
          else{
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
      });
    }

    search() {
      this.product = this.shopproducts.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));  
    }

}

