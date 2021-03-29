import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingController } from '@ionic/angular';
import  {Router} from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { from } from 'rxjs';
import { AlertController } from '@ionic/angular';
//import * as moment from 'moment';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.page.html',
  styleUrls: ['./unapproved.page.scss'],
})
export class UnapprovedPage implements OnInit {

  shops: any
  NotShopFound: boolean = false;
  constructor(
    public route: ActivatedRoute,
    public api: ShopService,
    public router: Router,
    public loadingController: LoadingController,
    //public events: Events,
    private alertController:AlertController,
    public toastService: ToastService
  ) { }


  ngOnInit() {
    // this.getUnApprovedShops();
  }
  ionViewDidEnter()
  {
    this.getUnApprovedShops();
  }

  async getUnApprovedShops() {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();

    await this.api.getUnApprovedShops().subscribe(
      res => {
        console.log(res);
        this.shops = res;
        if(this.shops.length ==0)
        {
          this.NotShopFound=true;
        }
        else{
          this.NotShopFound=false;
        }
     //   this.events.publish('unapprovedCount', this.doctors.length);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async onApproved(Id , data) {
    const loading = await this.loadingController.create({ message: 'Loading' });
    await loading.present();
    data.isVerified = true;
    await this.api.ApproveShop(Id , data).subscribe(
      res => {
        this.toastService.create("Shop Enable request succeded", "success");
        loading.dismiss();
        this.getUnApprovedShops();
        this.getApprovedShops();
      },
      err => {
        this.toastService.create(err, 'danger');
        loading.dismiss();
      }
    );
  }

  async getApprovedShops() {
    await this.api.getApprovedShops().subscribe(
      res => {
        console.log(res);
        this.shops = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  navigate1(id){
    this.router.navigateByUrl('superadmin/shop/'+id+'/Viewshops');
  }
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
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
                  this.ngOnInit();
                  
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



}
