/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, ViewChild } from '@angular/core'
import { ClassificationService } from 'src/app/services/class.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router , ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-classification',
  templateUrl: 'classification.page.html',
  styleUrls: ['classification.page.scss'],
})
export class ClassificationPage {

  category: any;
  id = this.route.snapshot.paramMap.get('id1');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classificationservice: ClassificationService,
    private categoryservice: CategoryService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private alertController: AlertController
    ) {}

  ionViewDidEnter() {
   this.getclassifications(this.id);
  }

  preventDefault(e) {
    e.preventDefault();
  }

 
  async getclassifications(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.categoryservice.GetSinglecategory(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.category = res;
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


  async Deleteclassification(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.classificationservice.Deleteclassification(id).subscribe(
      res => {
        loading.dismiss();
          this.getclassifications(this.id);
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
      message: 'Do you want to Delete this Brand?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
                  this.Deleteclassification(id);
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
