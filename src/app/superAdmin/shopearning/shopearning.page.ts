/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingController } from '@ionic/angular';
import { NavController, MenuController, Platform } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-search',
  templateUrl: './shopearning.page.html',
  styleUrls: ['./shopearning.page.scss'],
})
export class ShopEarningPage implements OnInit {

  selectDateString:string =new Date().toISOString();
  minDate:string=new Date().toISOString();
  maxDate:string=new Date().toISOString();
  earning:any;
  orders:any;
  accountdetails:any;
  date:any;
  RoleName: any;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private menuCtrl: MenuController,  private nav: NavController, private platform:Platform,
    public loadingController: LoadingController,public orderservice: OrderService, private storage: Storage,  public route: ActivatedRoute,
    
    ) {
      this.platform.ready().then(()=>{
        let date: Date=new Date();
        date.setDate(date.getDate() - 731);
        this.minDate=date.toISOString();
        date.setDate(1);

        date =new Date();
        date.setDate(date.getDate() + 0);
        this.maxDate=date.toISOString();
        date.setDate(1);
      }
      
      )
      
  }
  ionViewWillEnter(){
    this.date= new Date();
    this.date.setDate(1);
    this.date=moment(this.date,"DD-MM-YYYY").format("YYYY-MM-DD");
    console.log(this.date);
    this.GetShopEarning(this.id,this.date)
  }
  

  ngOnInit() {
   
    //this.GetShopEarning(this.id,this.date)
    this.storage.get("User").then(value=> {
      this.RoleName = value.RoleName;
    console.log("ROLE NAME", value.RoleName);
    });
  }

  DateChanger()
  {
    
    this.date=moment(this.date,"DD-MM-YYYY").format("YYYY-MM-DD");
    console.log(this.date);
  }

  async GetShopEarning(id,date)
  {
    console.log(date);
    date=moment(date,"YYYY-MM-01").format("YYYY-MM-01");
    console.log(date);
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
     await this.orderservice.GetShopEarning(id,date).subscribe(
        res=>{
          loading.dismiss();     
          // console.log(res);
          this.earning = res;
         
          if(this.earning.orders.length >0)
          {
            this.orders=res.orders;
          }
          this.accountdetails=res.orders[0];
          console.log("this ", this.accountdetails.shop)
          console.warn(res);
          err => {
            console.log(err);
            loading.dismiss();
          }     
      });
    
  }

}
