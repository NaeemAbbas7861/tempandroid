/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */

import { ShopService } from 'src/app/services/shop.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../data.service';
import { FunctionsService } from '../functions.service';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
  inputs: ['recieved_data']
})
export class ProductlistPage implements OnInit {
  env = environment;
  searchQuery: any;
  products:any;
  private allproduct = [];

 // @Input() recieved_data: Array<Product>;
  @Input() recieved_data;
  constructor(private fun: FunctionsService, 
    private nav: NavController,
     private loadingController: LoadingController,
     private shopservices: ShopService,
     private toastService: ToastService) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
  
    await this.shopservices.GetProduct().subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.allproduct = res;
        }
      
    },
    err => {
      loading.dismiss();
      this.toastService.create(err, "danger");
    });

  }

  open(id){
    this.nav.navigateForward('/productdetail/'+id +'/false');
  }

  search() {
    this.recieved_data = this.allproduct.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));   
  }

}
