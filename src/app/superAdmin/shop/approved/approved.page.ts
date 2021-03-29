import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AlertController } from '@ionic/angular';
import { env } from 'process';
@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss'],
})
export class ApprovedPage implements OnInit {

  shops: any
  today: any;
  NotShopFound: boolean = false;
  constructor(
    public route: ActivatedRoute,
    public api: ShopService,
    public loadingController: LoadingController,
    public router: Router,
    private alertController: AlertController,
    //  private events: Events,
    private toastService: ToastService
  ) {
    // this.today = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.getApprovedShops();
    this.doRefresh(event);
  }

  async getApprovedShops() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getApprovedShops().subscribe(
      res => {
        console.log(res);
        this.shops = res;
        if (this.shops.length == 0) {
          this.NotShopFound = true;
        }
        else {
          this.NotShopFound = false;
        }
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  async UnonApproved(Id, data) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    data.isVerified = false;
    await this.api.ApproveShop(Id, data).subscribe(
      res => {
        this.toastService.create("Shop Disable request succeded", "success");
        loading.dismiss();
        this.getApprovedShops();
        this.getUnApprovedShops();
        this.ionViewDidEnter();
      },
      err => {
        this.toastService.create(err, 'danger');
        loading.dismiss();
      }
    );
  }
  async getUnApprovedShops() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.api.getUnApprovedShops().subscribe(
      res => {
        console.log(res);
        this.shops = res;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  async DeleteShopById(id) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.api.DeleteShop(id).subscribe(
      res => {
        console.log(res);
        this.shops = res;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Delete?',
      message: 'Do you want to Delete this Shop?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.DeleteShopById(id);
            this.ionViewDidEnter();

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  navigate(id) {
    this.router.navigateByUrl('superadmin/shop/' + id + '/products');
  }
  navigate1(id) {
    this.router.navigateByUrl('superadmin/shop/' + id + '/Viewshops');
  }
  shopearning(id) {
    this.router.navigateByUrl('superadmin/' + id + '/shopearning');
  }
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}
