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
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
})
export class GroupPage {

  groups: any;
  constructor(
    private router: Router,
    private groupservice: GroupService,
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
    await this.groupservice.GetGroups().subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.groups = res;
         
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


  async DeleteGroup(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.groupservice.DeleteGroup(id).subscribe(
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
      message: 'Do you want to Delete this Group?',
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
