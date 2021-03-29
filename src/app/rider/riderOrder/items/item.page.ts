import { Component, OnInit, Output, EventEmitter ,  ViewChild , ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
declare var google;

@Component({
  selector: 'app-myshops',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemsPage implements OnInit {
  myMarker;
  verCode: any;
  map;
  statuschange:any;
  @ViewChild("mapElement", {static: true}) mapElement;
  items: any;
  id = this.route.snapshot.paramMap.get('id');
  type = this.route.snapshot.paramMap.get('type');
  userId;

  constructor(
    public route: ActivatedRoute,
    public orderservice: OrderService,
    public loadingController: LoadingController,
  //  private events: Events,
    private toastService: ToastService,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController

  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  ngOnInit(){
    this.GetOrderItems(this.id);
    
  }
  
  ionViewDidEnter() {
     //this.loadMap(33.6328532 , 72.93583679);
      this.storage.get("User").then(value=>{
      this.userId = value.sid;
    });
  }

  async GetOrderItems(id){
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
     await this.orderservice.GetOrder(id).subscribe(
        res=>{
          loading.dismiss();
          if(res){
           console.log(res);
          this.items = res;
          this.loadMap(res.shop.latitude , res.shop.longitude , res.customerLat , res.customerLong);
          console.log(res.shop.latitude , res.shop.longitude , res.customerLat , res.customerLong);
          }
          else{
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
      });
    }

    directionsService = new google.maps.DirectionsService;
    _directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    _directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    
    loadMap( shoplat , shoplong , customerlat , customerlong): void {
     
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        label: "A",
        center: { lat: shoplat, lng: shoplong },
        title: 'Hello World!',
        zoom: 15,
      });
      console.log( this.storage.get('Location'));

      this.storage.get("Location").then(value=> {
        if(value){
          console.log(value)
          new google.maps.Marker(
            {
              icon: "assets/images/rider_32_by_32.png", 
          
            map: this.map, position: value});
        }
      });
     

      this.directionsDisplay.setMap(this.map);
      this._directionsDisplay.setMap(this.map);
      this.myMarker = new google.maps.Marker({
        icon: "assets/images/pickup_point_32_by_32.png",
        position: { lat: shoplat, lng: shoplong ,  title: 'KuickSave Shop'},
        draggable: false
      });
      
      this.directionsService = new google.maps.DirectionsService()
      this._directionsService=new google.maps.DirectionsService();
      this.map.setCenter(this.myMarker.position);
      this.calculateAndDisplayRoute(shoplat , shoplong , customerlat , customerlong);
      this.myMarker.setMap(this.map);
  
      google.maps.event.addListener(this.myMarker, "dragend", function(evt) {
        this.latitude = evt.latLng.lat().toFixed(3);
        this.longitude = evt.latLng.lng().toFixed(3);
      });
    }
  
    
    calculateAndDisplayRoute(shoplat , shoplong , customerlat , customerlong) {
      console.log("working")
      const that = this;
       new google.maps.Marker({  icon: "assets/images/pickup_point_32_by_32.png", map: this.map,  position: new google.maps.LatLng(shoplat,shoplong),   label: this.items.shop.name,  });
      new google.maps.Marker({icon: "assets/images/delivery_point32_By_32.png", map: this.map,  position: new google.maps.LatLng(customerlat,customerlong), label: "Delivery Spot"});
      this.storage.get("Location").then(value=> {
        if(value){
      this._directionsService.route({
        origin: value,
        destination: {lat: shoplat , lng: shoplong},//formValues.destination,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          that._directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  });
      this.directionsService.route({
        origin: {lat: shoplat , lng: shoplong},
        destination: {lat: customerlat , lng: customerlong},//formValues.destination,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          that.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    async CompleteOrder(id ,verCode, status){  
      if (this.items)
      {
        const loading = await this.loadingController.create({ message: "Loading" });
        await loading.present();
    
          await this.orderservice.OrderCompletionCode(id , verCode , status)
          .subscribe(res => {        
              loading.dismiss();
              this.toastService.create('Order Complete Successfully');
              this.router.navigate(['/rider/orders/completed']);
             
          }, (err) => {
            loading.dismiss();
            console.log(err);
            this.toastService.create("Invalid Order Code", 'danger');
          });
    }
  }


  // async acceptOrder(orderid , status){  
  //   if (this.items)
  //   {
  //     const loading = await this.loadingController.create({ message: "Loading" });
  //     await loading.present();
  //       await this.orderservice.AcceptOrder(orderid , this.userId , status)
  //       .subscribe(res => {        
  //           loading.dismiss();
  //           if (status == 1)
  //           this.router.navigate(['/rider/orders/pending']);
  //           else
  //           this.router.navigate(['/rider/orders/completed']);
  //       }, (err) => {
  //         loading.dismiss();
  //         console.log(err)
  //         this.toastService.create(err, 'danger');
  //       });
  //      }
  //   }

    async CancelOrder(id,status)
    {
      
      const loading= await this.loadingController.create({message: "Loading"});
      await loading.present();
      await this.orderservice.CancelOrder(id,0).subscribe(
        res=>{
          loading.dismiss();
          if(status==0)
          {
           loading.dismiss();
            console.log(res);
            this.toastService.create('Order Cancel  request succeded');
            this.router.navigate(['rider/orders/new']);
          }
        },
        (err) =>{
          loading.dismiss();
          console.log(err)
          this.toastService.create(err, 'danger');

        });
      }



async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Cancel',
    message: 'Do you want to Cancel this Order?',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
                this.CancelOrder(this.id, 0);
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
doRefresh(event) {
  console.log('Begin async operation');
  this.ngOnInit();
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 1000);
}


   
}
