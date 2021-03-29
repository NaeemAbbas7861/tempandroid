import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { SharedService } from "src/app/services/shared.service";
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Storage } from '@ionic/storage';

@Component({
  selector: "app-rider",
  templateUrl: './dashboard.page.html',
  // styleUrls: ['./dashboard/dashboard.page.scss'],
})
export class RiderPage implements OnInit {
  data: any;
  data1: any;
  event: any;
  riders: any;
  Latitude: number;
  Longitude: number;
  location: boolean = true;
  constructor(
    public sharedservice: SharedService,
    public orderservice: OrderService,
    public loadingController: LoadingController,
    private router: Router,
    private toastService: ToastService,
    private storage: Storage,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
    this.data = console.log(this.sharedservice.user);
   
  }

  ionViewDidEnter() {
    this.storage.get("User").then(value => {
      if (value) {
        console.log(value.sid);
        this.GetRiderDashboardData(value.sid);
      }   
    });   
    this.getUserLocation();
  }
  async getUserLocation() {
    const loading = await this.loadingController.create({ message: "Getting location" });
    await loading.present();
    this.geolocation
      .getCurrentPosition( {maximumAge: 60000, timeout: 4000, enableHighAccuracy: true} )
      .then(resp => {
        loading.dismiss();
        this.location = true;
        this.Latitude = resp.coords.latitude;
        this.Longitude = resp.coords.longitude;
        console.log("Rider Lat",this.Latitude, "rider Long", this.Longitude);
        this.storage.set('Location',{lat:this.Latitude,lng:this.Longitude});
      })
      .catch(error => {
        console.log("Error getting location", error);
        this.location = false;
        loading.dismiss();
      });
  }


  Onclick() {
    this.router.navigateByUrl('rider/orders/new');
  }
  Onclick1() {
    this.router.navigateByUrl('rider/orders/pending');
  }
  Onclick2() {
    this.router.navigateByUrl('rider/orders/completed');
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  async GetRiderDashboardData(data1) {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.orderservice.riderDashboard(data1).subscribe(
      res => {
        loading.dismiss();
        if (res) {
          loading.dismiss();
          console.log(res);
          this.riders = res;
        }
        else {
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

}
