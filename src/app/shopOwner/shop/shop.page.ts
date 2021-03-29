import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { SharedService } from 'src/app/services/shared.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-myshops',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPageOwner implements OnInit {

  shops: any
  today: any;
  load = true;
  Nodata = false;

  constructor(
    public route: ActivatedRoute,
    public api: ShopService,
    public loadingController: LoadingController,
  //  private events: Events,
    private toastService: ToastService,
    private sharedservice: SharedService
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
  }
  ionViewDidEnter()
  {
    
    this.getShopsByUser(this.sharedservice.user.sid);
  }

  async getShopsByUser(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getShopsByUser(id).subscribe(
      res => {
        console.log(res);
        this.shops = res;
        if (res.length == 0)
        this.Nodata = true;
        this.load = true;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
        this.load = false;
      }
    );
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

}
