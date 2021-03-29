/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit , ViewChild, ChangeDetectorRef} from '@angular/core'
import { ShopService } from 'src/app/services/shop.service';
import { GroupService } from 'src/app/services/group.service';
import { Router , ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File , FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { group } from 'console';
declare var google;


@Component({
  selector: 'app-addshop',
  templateUrl: 'editshop.page.html',
  styleUrls: ['editshop.page.scss'],
})
export class EditShopPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  groups:any;
  GroupId: any;
  AccountType:any;
  BankName:any;
  groupss:any;
  uploadProgress: number;
  uploadinglogo = false;
  uploadingbanner=false;
  resourceURL = environment.RESOURCE_URL;
  id = this.route.snapshot.paramMap.get('id');
  myMarker;
  map;
  latitude: any;
  longitude: any;
  @ViewChild("mapElement", {static: true}) mapElement;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopservice: ShopService,
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
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'Id':[null],
        'Name':[null, [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9$#@&?!*()%<>+=-|,. ]*()$")]],
        'GroupId': [null],
        'UserId': [null],
        'Contact':[null,  Validators.compose([
          Validators.required,
          Validators.pattern("^0[03][0-9]{9}$")
        ])],
        'NDN_Number': [null, [Validators.required, Validators.pattern("[0-9]{13}$")]],
        'AccountType': [null, Validators.required],
        'BankName':[null],
        'AccountNumber':[null, Validators.required],
        'Latitude': [null],
        'Longitude': [null],
        'DeliveryRadius': [null,Validators.compose([ Validators.required, Validators.min(10)])],
        'Address': [null, Validators.required],
        'IsReturnable':[null],
        'IsVerified': [false],
        'IsDisabled': [false],
        'Logo': [null, Validators.required],
        // 'Banner': [null],
      });
     
     
    }
   

  async ionViewDidEnter() {

 await this.getGroups();

  await this.getShop(this.id);

 
 
  }

  preventDefault(e) {
    e.preventDefault();
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

  BankNames(event){
   this.fg.controls['BankName'].setValue(event.target.value);

  }

  updatelatlng(lt , lg){
    this.latitude = lt;
    this.longitude = lg
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
  async loadMap(){ 
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
    }); 
}


  async UpdateShop() {
    //console.log(this.fg.value)
    this.fg.controls['GroupId'].setValue(this.GroupId);
    this.fg.value.Latitude = this.latitude;
    this.fg.value.Longitude = this.longitude;
    const loading = await this.loadingController.create({ message: "Loading" });
    // await loading.present();
    if(this.fg.value.DeliveryRadius <10)
    {
      this.toastService.create("radius must be be 10 or higher", "danger");
      return false;
    }
    else{
    await this.shopservice.UpdateShop(this.id , this.fg.value).subscribe(
      res => 
      {
        console.log(res,"shop");
        loading.dismiss();
        this.toastService.create("Successfully Added", "success");
        this.router.navigate(['shopowner/shops']);

      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
    }
  }

  async getShop(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.shopservice.GetShop(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
        // console.log(res);
        this.latitude = res.latitude;
        this.longitude = res.longitude;
         this.fg.controls['Id'].setValue(res.id);
         this.fg.controls['Name'].setValue(res.name);
        // this.fg.controls['GroupId'].setValue(res.groupId);
        // this.fg.value.GroupId=res.groupId;
         this.GroupId=(res.groupId);
         this.fg.controls['UserId'].setValue(res.userId);
         this.fg.controls['Contact'].setValue(res.contact);
         this.fg.controls['Latitude'].setValue(res.latitude);
         this.fg.controls['Longitude'].setValue(res.longitude);
         this.fg.controls['DeliveryRadius'].setValue(res.deliveryRadius);
         this.fg.controls['NDN_Number'].setValue(res.ndN_Number);
         this.fg.controls['Address'].setValue(res.address);    
         this.AccountType=(res.accountType) ;
         this.BankName=(res.bankName);
        //  this.fg.controls['AccountType'].setValue(res.accountType);
        //  this.fg.controls['BankName'].setValue(res.bankName);
         this.fg.controls['AccountNumber'].setValue(res.accountNumber);
         this.fg.controls['IsDisabled'].setValue(res.isDisabled);
         this.fg.controls['IsVerified'].setValue(res.isVerified);
         this.fg.controls['Logo'].setValue(res.logo);
        //  this.fg.controls['Banner'].setValue(res.banner);
         this.loadMap();
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

  uploadPhoto(type) {

    this.fileChooser.open().then(async uri =>
      {
        console.log(uri);
       await  this.filePath.resolveNativePath(uri).then(filePath =>
          {
            //this.filesPath = filePath;
            // if(type=='banner')
            // {

            //  this.uploadingbanner = true;
            //  this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
            //   {
            //     let files = fileInfo as FileEntry;
            //     files.file(async success =>
            //       {
            //         //this.fileType   = success.type;
            //         let filesName  = success.name;
            //         console.log(filesName);
            //         let options: FileUploadOptions = {
            //           fileName: filesName
            //         }
            //         const fileTransfer: FileTransferObject = this.transfer.create();
            //       await  fileTransfer.upload(uri, environment.BASE_URL+'upload', options)
            //         .then((data) => {
            //           // success
            //          // console.log(data);
            //          this.toastService.create("successfully Uploaded");
            //           this.uploadingbanner = false;
            //           let dbpath = JSON.parse(data.response); 
            //           this.fg.value.Logo = dbpath.dbPath;
                     
            //           //console.log(this.fg1.value.MonogramImage);
            //         }, (err) => {
            //           this.uploadingbanner = false;
            //           this.toastService.create("Error" , "danger");
            //           this.ref.detectChanges();
            //           console.log(err)
            //           // error
            //         })
            //       });
            //   },err =>
            //   {
            //     console.log(err);
            //     throw err;
            //   });
            // }
            if(type=='logo')
            {
            this.uploadinglogo = true;
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
                      this.uploadinglogo = false;
                      let dbpath = JSON.parse(data.response);
                    
                      this.fg.value.Logo = dbpath.dbPath
                      this.ref.detectChanges();
                      //console.log(this.fg1.value.MonogramImage);
                    }, (err) => {
                      this.uploadinglogo = false;
                      this.toastService.create("Error" , "danger");
                      this.ref.detectChanges();
                      console.log(err)
                      // error
                    })
                  }
                  else{
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
  
  validation_messages = {
  
    Name: [{ type: "required", message: "Name is required." },
    { type: "pattern", message: "space is not allowed to start." }],
    
    lastName: [{ type: "required", message: "LastName is required." }],
    NDN_Number: [
      { type: "required", message: "Please enter a valid NTN NO:" },
      { type:"pattern", message: "NTN number must be 13 character"},
    ],
    mobileNumber: [
      { type: "required", message: "MobileNumber is required." },
      { type: "pattern", message: "Mobile number like 03xxxxxxxxx" }
    ],
    Address: [
      { type: "required", message: "Address is required." },
    ],
    Type: [
      { type: "required", message: "Shop cateory is required." },
    ],
    Radious: [
      { type: "required", message: "Field is required." },
      {  type: "min", message: "radius must be be 10 or higher."},
    ]
  };

}
