/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { GroupService } from 'src/app/services/group.service';
import { Router , ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-category',
  templateUrl: 'category.page.html',
  styleUrls: ['category.page.scss'],
})
export class CategoryPage {

  group: any;
  id = this.route.snapshot.paramMap.get('id');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryservice: CategoryService,
    private groupservice: GroupService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private alertController: AlertController
    ) {}

  ionViewDidEnter() {
   this.getcategorys(this.id);
  }

  preventDefault(e) {
    e.preventDefault();
  }

 
  async getcategorys(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.groupservice.GetSingleGroup(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.group = res;
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


  async Deletecategory(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.categoryservice.Deletecategory(id).subscribe(
      res => {
        loading.dismiss();
          this.getcategorys(this.id);
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
      message: 'Do you want to Delete this Category?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
                  this.Deletecategory(id);
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
