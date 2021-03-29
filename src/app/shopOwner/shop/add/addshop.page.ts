/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit , ViewChild , ChangeDetectorRef} from '@angular/core'
import { ShopService } from 'src/app/services/shop.service';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { SharedService } from "src/app/services/shared.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Geolocation } from "@ionic-native/geolocation/ngx";
//import { AnyTxtRecord } from 'dns';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File , FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
declare var google;

@Component({
  selector: 'app-addshop',
  templateUrl: 'addshop.page.html',
  styleUrls: ['addshop.page.scss'],
})
export class AddShopPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  groups:any;
  banklist:any;
  uploadProgress: number;
  resourceURL = environment.RESOURCE_URL;
  myMarker;
  uploadinglogo;
  uploadingbanner;
  map;
  latitude: any;
  longitude: any;
  @ViewChild("mapElement", {static: true}) mapElement;

  constructor(
    private router: Router,
    private shopservice: ShopService,
    private sharedservice: SharedService,
    private groupservice: GroupService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private geolocation: Geolocation,
    private fileChooser: FileChooser,
    private file: File,
    private filePath: FilePath,
    private transfer: FileTransfer,
    private ref: ChangeDetectorRef
    // private imagePicker: ImagePicker
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'Name': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9$#@&?!*()%<>+=-|,. ]*()$")]],
        'GroupId': [null, Validators.required],
        'UserId': [null],
        'Contact':[null,  Validators.compose([
          Validators.required,
          Validators.pattern("^0[03][0-9]{9}$")
        ])],
        'AccountType': [null, Validators.required],
        'BankName':[null],
        'AccountNumber':[null, Validators.required],
        'NDN_Number': [null, [Validators.required,   Validators.pattern("[0-9]{13}$")]],
        'Latitude': [null],
        'Longitude': [null],
        'DeliveryRadius': [null,Validators.compose([ Validators.required, Validators.min(10)])],
        'Address': [null, Validators.required],
        'IsReturnable':[null],
        'IsVerified': [false],
        'IsDisabled': [false],
        'Logo': [null,  Validators.required],
        // 'Banner': [null],
      });
    }

  ionViewDidEnter() {
  this.toastService.create("Kindly Open your Gps location then add Shop", "mycolor1");
  this.getGroups();
  this.GetBankList();
  this.getUserLocation();
  }
  BankAccount(event){
    console.log(event.target.value);
  }

  AccountTypeForPayment(event){
    this.fg.value.AccountType= event.target.value;
    this.fg.controls['AccountType'].setValue(event.target.value);
    // if(this.fg.value.AccountType= 'Bank')
    // {
    //   this.fg.controls['BankName'].setValidators(Validators.required);
    // }
  // this.fg.value.AccountType= event.target.value;
  console.log(event.target.value);
  }

  BankName(event){
    this.fg.controls['BankName'].setValue(event.target.value);

  }

  preventDefault(e) {
    e.preventDefault();
  }
  uploadPhoto(type) {

    this.fileChooser.open().then(async uri =>
      {
        console.log(uri);
       await  this.filePath.resolveNativePath(uri).then(filePath =>
          {
            //this.filesPath = filePath;
            if(type=='banner')
            {
              this.uploadingbanner = true;
            this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
              {
                let files = fileInfo as FileEntry;
                files.file(async success =>
                  {
                    //this.fileType   = success.type;
                    if (success.size < 204800) {
                    let filesName  = success.name;
                    console.log(filesName);
                    let options: FileUploadOptions = {
                      fileName: filesName
                    }
                    const fileTransfer: FileTransferObject = this.transfer.create();
                  await  fileTransfer.upload(uri, environment.BASE_URL+'upload', options)
                    .then((data) => {
                      // success
                     // console.log(data);
                     this.toastService.create("successfully Uploaded");
                      this.uploadingbanner = false;
                      let dbpath = JSON.parse(data.response);
                      this.fg.controls['Banner'].setValue(dbpath.dbPath);
                      this.ref.detectChanges();
                      //console.log(this.fg1.value.MonogramImage);
                    }, (err) => {
                      console.log(err)
                      // error
                    })
                  }
                  else
                  this.uploadingbanner = false;
                  this.toastService.create("File size must be less than 200 kb", "danger");
                  this.uploadingbanner = false;
                  });
              },err =>
              {
                console.log(err);
                throw err;
              });
            }
            else if(type=='logo')
            {
              this.uploadinglogo = true;
            this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
              {
                let files = fileInfo as FileEntry;
                files.file(async success =>
                  {
                    //this.fileType   = success.type;
                    if (success.size < 204800) 
                {
                    let filesName  = success.name;
                    console.log(filesName);
                    let options: FileUploadOptions = {
                      fileName: filesName
                    }
                    const fileTransfer: FileTransferObject = this.transfer.create();
                  await  fileTransfer.upload(uri, environment.BASE_URL+'upload', options)
                    .then((data) => {
                      // success
                     // console.log(data);
                     this.toastService.create("successfully Uploaded");
                      this.uploadinglogo = false;
                      let dbpath = JSON.parse(data.response); 
                      this.fg.controls['Logo'].setValue(dbpath.dbPath);
                      this.ref.detectChanges();
                      //console.log(this.fg1.value.MonogramImage);
                    }, (err) => {
                      console.log(err)
                      // error
                    })
                }
                  else
                  {
                  this.uploadinglogo = false;
                  this.toastService.create("File size must be less than 200 kb", "danger");
                  }
                  });
              },err =>
              {
                console.log(err);
                throw err;
              });
            }
          },err =>
          {
            console.log(err);
            throw err;
          });
      },err =>
      {
        console.log(err);
        throw err;
      });
  
  }
 

  pickimage()
  {
    //  var options: ImagePickerOptions = { 
    //   maximumImagesCount: 2 ,
    //   quality: 50};
    // this.imagePicker.getPictures(options).then((results) => {
    //   this.imagepath = results[0];
    //   for (var i = 0; i < results.length; i++) {
    //       console.log('Image URI: ' + results[i]);
    //   }
    // }, (err) => { });
  }


  async AddShop() {
    this.fg.controls['UserId'].setValue(this.sharedservice.user.sid);
    // this.fg.controls['Latitude'].setValue(this.Latitude);
    // this.fg.controls['Longitude'].setValue(this.Longitude);

    this.fg.value.Latitude = this.latitude;
    this.fg.value.Longitude = this.longitude;
    if(this.fg.value.DeliveryRadius <10)
    {
      this.toastService.create("Please Fill all field and radius must be be 10 or higher", "danger");
      return false;
    }
    else{

    console.log(this.fg.value)
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.shopservice.PostShop(this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Added", "success");
        this.router.navigate(['shopowner/shops']);

      },
      err => {
        loading.dismiss();
        this.toastService.create("Please Fill the All Fields", "danger");
      }
    );
    }
  }
 
  getUserLocation() {
    this.geolocation
    .getCurrentPosition( {maximumAge: 40000, timeout: 4000, enableHighAccuracy: true} )
    .then(resp => {
     
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log()
      this.loadMap();
      console.log("latitude",this.latitude, "longitude", this.longitude);
    })
    .catch(error => {
      console.log("Error getting location", error);
    });
  }

loadMap(){ 
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 15
    });
  
    this.myMarker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      draggable: true
    });
    this.map.setCenter(this.myMarker.position);
    this.myMarker.setMap(this.map);

    google.maps.event.addListener(this.myMarker, "dragend", ()=> {
      this.latitude = this.myMarker.getPosition().lat();
       this.longitude = this.myMarker.getPosition().lng();
       console.log("latitude",this.latitude, "longitude", this.longitude);
  }); 
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

  async GetBankList() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.shopservice.GetBank().subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.banklist = res; 
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

  validation_messages = {
  
    Name: [{ type: "required", message: "Name is required." },
           { type: "pattern", message: "space is not allowed to start." }
],
    lastName: [{ type: "required", message: "LastName is required." }],
    NDN_Number: [
      { type: "required", message: "Please enter a valid NTN NO:" },
      { type:"pattern", message: "NTN number must be 13 character"},
    ],
    mobileNumber: [
      { type: "required", message: "MobileNumber is required & without space." },
      { type: "pattern", message: "Mobile number like 03xxxxxxxxx" }
    ],
    Address: [
      { type: "required", message: "Address is required." },
    ],
    Type: [
      { type: "required", message: "Shop cateory is required." },
    ],
    AccountType: [
      { type: "required", message: "Payment method is required." },
    ],
    Radious: [
      { type: "required", message: "Field is required." },
      {  type: "min", message: "radius must be be 10 or higher."},
    ],
    AccountNumber: [
      { type: "required", message: "Account Number is required." },
    ],
    BankName: [
      { type: "required", message: "Account Number is required." },
    ],
  };


}
