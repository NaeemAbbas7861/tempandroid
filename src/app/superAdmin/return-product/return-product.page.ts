import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { OrderService } from 'src/app/services/order.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-return-product',
  templateUrl: './return-product.page.html',
  styleUrls: ['./return-product.page.scss'],
})
export class ReturnProductPage {
  returnproduct: any;
  groups: any;
  constructor(
    private router: Router,
    private OrderService: OrderService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private alertController: AlertController
    ) {}

  ionViewDidEnter() {
   this.getGroups();
  }

  preventDefault(e) {
    e.preventDefault();
  }

 
  async getGroups() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.OrderService.Getreturnedproduct().subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.returnproduct = res;
         
          //  this.ngOnInit();
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


  // async DeleteGroup(id) {
  //   const loading = await this.loadingController.create({ message: "Loading" });
  //   await loading.present();
  //   await this.OrderService.Getreturnedproduct(id).subscribe(
  //     res => {
  //       loading.dismiss();
  //         this.getGroups();
  //         this.toastService.create("Successfully deleted", "success");
  //     },
  //     err => {
  //       loading.dismiss();
  //       this.toastService.create(err, "danger");
  //     }
  //   );
  // }
  async DeleteGroup(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.OrderService.DeleteProduct(id).subscribe(
      res => {
        loading.dismiss();
          this.getGroups();
          this.toastService.create("Successfully deleted", "success");
      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Are you Sure?',
      message: 'Do you want to Delete this Product?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
                  this.DeleteGroup(id);
                  console.log('Confirm Okay:');
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
