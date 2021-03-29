import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
declare var google;

@Component({
  selector: 'app-myshops',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemsPage implements OnInit {

  items: any;
  id = this.route.snapshot.paramMap.get('id');
  type = this.route.snapshot.paramMap.get('type');
  map;
  myMarker;
  Latitude: any;
  Longitude: any;
  @ViewChild("mapElement", {static: true}) mapElement;
  constructor(
    public route: ActivatedRoute,
    public orderservice: OrderService,
    public loadingController: LoadingController,
  //  private events: Events,
  private router: Router,
    private toastService: ToastService
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  ngOnInit() { 
   
  }

  ionViewDidEnter(){
    this.GetOrderItems(this.id);
  }

  async GetOrderItems(id){
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
     await this.orderservice.GetOrder(id).subscribe(
        res=>{
          loading.dismiss();
          if(res){
            this.Latitude = 33.6520;
            this.Longitude = 72.9087;
          // console.log(res);
          this.items = res;
          console.warn(res);
          this.loadMap();
          
          }
          else{
            loading.dismiss();
            this.toastService.create(res.Message, "danger");
          }
      });
    }

    loadMap(){ 
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: this.Latitude, lng: this.Longitude },
        zoom: 15
      });
    
      this.myMarker = new google.maps.Marker({
        position: { lat: this.Latitude, lng: this.Longitude },
        draggable: false
      });
      this.map.setCenter(this.myMarker.position);
      this.myMarker.setMap(this.map);
  
      // google.maps.event.addListener(this.myMarker, "dragend", function(evt) {
      // this.Latitude = evt.latLng.lat().toFixed(3);
      // this.Longitude = evt.latLng.lng().toFixed(3);
      // }); 
  }
  async CancelOrder(id,status)
  {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    status=3;

     await this.orderservice.CancelOrder(id , status).subscribe(
        res=>{
          loading.dismiss();
          this.items = res;
          console.warn(res);
          this.toastService.create('Order Cancel request succeded'); 
          this.router.navigate(['shopowner/order/new']);
      
          err => {
            console.log(err);
            loading.dismiss();
          }      });
    
  }
  

}
