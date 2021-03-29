import { Component, OnInit , ViewChild, ChangeDetectorRef} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { GroupService } from 'src/app/services/group.service';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Geolocation } from "@ionic-native/geolocation/ngx";
//import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File , FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
declare var google;







@Component({
  selector: 'app-approved',
  templateUrl: './viewshops.page.html',
  styleUrls: ['./Viewshops.page.scss'],
})
export class Viewshops implements OnInit {

  Viewshop: any
  today: any;
  resourceURL = environment.RESOURCE_URL;
  id = this.route.snapshot.paramMap.get('id');
  map;
  myMarker;
  Latitude: any;
  Longitude: any;
  @ViewChild("mapElement", {static: true}) mapElement;
  constructor(
    public route: ActivatedRoute,
    public api: ShopService,
    public loadingController: LoadingController,
    public router: Router,
  //  private events: Events,
    private toastService: ToastService
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.GetShop(this.id);
  }

  async GetShop(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.GetShop(id).subscribe(
      res => {
        loading.dismiss();
        if (res){
          this.Latitude = res.latitude;
        this.Longitude = res.longitude;
        console.log(res);
        this.Viewshop = res;
        loading.dismiss();
        this.loadMap();
        }
       else {
          loading.dismiss();
          this.toastService.create(res.Message, "danger");
       }
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
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
  
}
