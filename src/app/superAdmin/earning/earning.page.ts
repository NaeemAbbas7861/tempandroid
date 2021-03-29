/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LoadingController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import * as moment from 'moment';
import { NavController, MenuController, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-search',
  templateUrl: './earning.page.html',
  styleUrls: ['./earning.page.scss'],
})
export class EarningPage implements OnInit {
  
  selectDateString:string =new Date().toISOString();
  selectDateString1:string =new Date().toISOString();
  minDate:string=new Date().toISOString();
  maxDate:string=new Date().toISOString();
  earning:any;
  date1:any;
  date2:any;

  private readonly API_EARNING = `${environment.BASE_URL}`; 


  constructor(private menuCtrl: MenuController,  private nav: NavController, private platform:Platform,
    public loadingController: LoadingController, public orderservice: OrderService,private download: Downloader, private toastService: ToastService
    
    ) {
      this.platform.ready().then(()=>{
        let date: Date=new Date();
        date.setDate(date.getDate() - 731);
        this.minDate=date.toISOString();
        // date.setDate(1);

        date =new Date();
        date.setDate(date.getDate() + 0);
        this.maxDate=date.toISOString();
        // date.setDate(1);

      }
      
      )
      
  }

  ngOnInit() {
    
    // this.date= new Date();
    // this.date.setDate(1);
    // this.date=moment(this.date,"DD-MM-YYYY").format("YYYY-MM-DD");
    // console.log(this.date);
    //this.getEarning(this.date);
   
  }


  async getEarning(date, selectDateString1)
  {
  
    date=moment(date,"YYYY-MM-DD").format("YYYY-MM-DD");
    this.selectDateString1=moment(selectDateString1,"YYYY-MM-DD").format("YYYY-MM-DD");
    console.log(date, this.selectDateString1);
    if(date > this.selectDateString1)
    {
      this.toastService.create( "Please select Date to is greater than Date From",'danger');
    }
    else
    {
    const loading = await this.loadingController.create({ message: "Loading" });
     await loading.present();
     await this.orderservice.GetEarningDatetoDate(date,this.selectDateString1).subscribe(
        res=>{
          loading.dismiss();     
          // console.log(res);
          this.earning = res;
          console.warn(res);
          err => {
            console.log(err);
            loading.dismiss();
          }
    
          
      });
    }
  }

  async DownloadEarningDatetoDate(date1, date2)
  {
    date1=moment(date1,"YYYY-MM-DD").format("YYYY-MM-DD");
    date2=moment(date2,"YYYY-MM-DD").format("YYYY-MM-DD");
    console.log(date1, date2);
    console.log("https://be.kuicksave.com/api/Earning/downloadcsv/"+date1+"/"+date2);
    if(date1 > date2)
    {
      this.toastService.create( "Please select Date to is greater than Date From",'danger');
    }
    
    else
    {
      var request: DownloadRequest = {
      
        uri: `${this.API_EARNING}downloadcsv/${date1}/${date2}`,
        title: 'MyDownload',
        description: '',
        mimeType: '',
        visibleInDownloadsUi: true,
        notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
        destinationInExternalFilesDir: {
            dirType: 'Downloads',
            subPath: 'Earning.csv',
        }
        
        
    };
    this.download.download(request)
    .then((location: string) => console.log('File downloaded at:'+location))
    .catch((error: any) => console.error(error));

  window.open("https://be.kuicksave.com/api/Earning/downloadcsv/"+date1+"/"+date2)

  }
}
 

}
