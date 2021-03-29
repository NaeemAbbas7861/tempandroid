/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ShopService } from 'src/app/services/shop.service';
import { GroupService } from 'src/app/services/group.service';
import { Router , ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File , FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
//import { AnyTxtRecord } from 'dns';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-addshop',
  templateUrl: 'editproduct.page.html',
  styleUrls: ['editproduct.page.scss'],
})
export class EditProductPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  groups:any;
  categorys: any = [];
  classification: any = [];
  shopId = this.route.snapshot.paramMap.get('id');
  groupId = this.route.snapshot.paramMap.get('groupId');
  productId = this.route.snapshot.paramMap.get('proid');
  Images = [];
  clid:any;
  uploading = false;
  resourceURL = environment.RESOURCE_URL;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopservice: ShopService,
    private groupservice: GroupService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private fileChooser: FileChooser,
    private file: File,
    private filePath: FilePath,
    private transfer: FileTransfer,
    private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'Id':  [null , Validators.required],
       'Title': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9$#@&?!*()%<>+=-|,. ]*()$")]],
        'Description': [null, [Validators.required,Validators.min(100)]],
        'Price': [null , Validators.required],
        'ProductCode': [null, Validators.required],
        'Quantity': [null, Validators.required],
        'Weight': [null],
        'Unit': [null],
        'Dimension': [null],
        'Discount':[null],
        'IsDisabled': [false],
        'IsAllowed': [true],
        'IsOutOfStock': [false],
        'IsNew': [true],
        'IsSale': [false],
        'ClassificationId': [null],
        'ShopId': this.shopId,
        'Images': [null],
       

      });
    }

  async ionViewDidEnter() {
    
    await this.getProduct(this.productId);
    await this.getProduct(this.productId);
    await this.getGroups(this.groupId);
  }

  preventDefault(e) {
    e.preventDefault();
  }

  slideOpts = {
    effect: 'flip'
  };

  uploadPhoto() {

    this.fileChooser.open().then(async uri =>
      {
        console.log(uri);
       await  this.filePath.resolveNativePath(uri).then(filePath =>
          {
            //this.filesPath = filePath;
            this.uploading = true;
            this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
              {
                let files = fileInfo as FileEntry;
                files.file(async success =>
                  {
                    //this.fileType   = success.type;
                    let filesName  = success.name;
                    console.log(filesName);
                    let options: FileUploadOptions = {
                      fileName: filesName
                    }
                    const fileTransfer: FileTransferObject = this.transfer.create();
                  await  fileTransfer.upload(uri, environment.BASE_URL+'upload', options)
                    .then((data) => {                 
                     this.uploading = false;
                     this.toastService.create("successfully Uploaded");
                      let dbpath = JSON.parse(data.response);
                      //this.fg.value.Banner = dbpath.dbPath;
                      let obj = {"path": dbpath.dbPath};
                      this.Images.push(obj);
                      this.ref.detectChanges();
                    }, (err) => {
                      console.log(err)
                      // error
                    })
                  });
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
      },err =>
      {
        console.log(err);
        throw err;
      });
  
  }
  async getGroups(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.groupservice.GetSingleGroup(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.categorys = res.categories;
       console.log("Category",this.categorys);
      console.log("Classification",this.fg.value.ClassificationId);
      this.categorys.forEach(element => {
        if(element)
        {
          element.classifications.forEach(ele => {
           
           if(ele.id==this.fg.value.ClassificationId)
           {
            this.classification = element;
            console.log(this.classification);
           }
           else{
             
           }
          });
          this.fg.controls.ClassificationId.setValue(this.clid);
          console.log(this.fg.value.ClassificationId);
          this.ref.detectChanges();  
        }
      
        
      });
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

  output(){
    this.fg.controls['ClassificationId'].setValue(null);
  }

  async UpdateProduct() {
    this.fg.value.Images = this.Images;
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.shopservice.UpdateProduct(this.productId , this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Updated", "success");
        this.router.navigate(['shopowner/shops/'+this.shopId+'/product']);

      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }

  async getProduct(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.shopservice.GetProductDetail(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
        // console.log(res);
         this.fg.controls['Id'].setValue(res.id);
         this.fg.controls['Title'].setValue(res.title);
         this.fg.controls['Description'].setValue(res.description);
         this.fg.controls['Price'].setValue(res.price);
         this.fg.controls['ProductCode'].setValue(res.productCode);
         this.fg.controls['Quantity'].setValue(res.quantity);
         this.fg.controls['Weight'].setValue(res.weight);
         this.fg.controls['Unit'].setValue(res.unit);
         this.fg.controls['Dimension'].setValue(res.dimension);
         this.fg.controls['Discount'].setValue(res.discount);
         this.fg.controls['IsDisabled'].setValue(res.isDisabled);
         this.fg.controls['IsAllowed'].setValue(res.isAllowed);
         this.fg.controls['IsOutOfStock'].setValue(res.isOutOfStock);
         this.fg.controls['IsNew'].setValue(res.isNew);
         this.fg.controls['IsSale'].setValue(res.isSale);
        // this.fg.controls['ClassificationId'].setValue(res.classificationId);
         this.clid= res.classificationId;
         this.fg.controls['ShopId'].setValue(res.shopId);
         this.fg.controls['Images'].setValue(res.images);
         this.Images = res.images;
         //this.clid= res.classificationId;
        

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

  deleteImage(index){
  this.Images.splice(index , 1);
  }

  validation_messages = {
  
    Name: [{ type: "required", message: "Name is required." },
    { type: "pattern", message:"space is not allowed to start." }
  ],
    Description: [{ type: "required", message: "Description is required." },
    { type: "minlength", message: "Description must be 100 character ." } 
    ],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    Price: [
      { type: "required", message: "Price is required." }
    ],
    ProductCode: [
      { type: "required", message: "Field is required." },
    ],
    Type: [
      { type: "required", message: "Classification is required." },
    ],
    Unit: [
      { type: "required", message: "Unit is required." },
     
    ],
  };

}
