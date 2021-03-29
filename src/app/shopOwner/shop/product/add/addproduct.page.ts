import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ShopService } from 'src/app/services/shop.service';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File , FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { AnyTxtRecord } from 'dns';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-addproduct',
  templateUrl: 'addproduct.page.html',
  styleUrls: ['addproduct.page.scss'],
})
export class AddProductPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  groups:any;
  categorys: any;
  classification: any = [];
  shopId = this.route.snapshot.paramMap.get('id');
  groupId = this.route.snapshot.paramMap.get('groupId');
  resourceURL = environment.RESOURCE_URL;
  uploading = false;
  Images = [];
  slideOpts = {
    effect: 'flip'
  };
  constructor(
    private router: Router,
    private shopservice: ShopService,
    private groupservice: GroupService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fileChooser: FileChooser,
    private file: File,
    private filePath: FilePath,
    private transfer: FileTransfer,
    private ref: ChangeDetectorRef
    // private imagePicker: ImagePicker
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'Title':[null, [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9$#@&?!*()%<>+=-|,. ]*()$")]],
        'Description': [null,[Validators.required, Validators.min(100)]],
        'Price': [null , Validators.required],
        'ProductCode': [null],
        'Quantity': [null, Validators.required],
        'Weight': [null],
        'Unit': [null],
        'Dimension': [null],
        'Discount':[null,  [Validators.min(0), Validators.max(100)]],
        'IsDisabled': [false],
        'IsAllowed': [true],
        'IsOutOfStock': [false],
        'IsNew': [true],
        'IsSale': [false],
        'ClassificationId': [null,Validators.required ],
        'ShopId': this.shopId,
        'Images': [null]
      });
    }

  ionViewDidEnter() {
  this.getGroups(this.groupId);
  }

  preventDefault(e) {
    e.preventDefault();
  }

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
  
    deleteImage(index){
      this.Images.splice(index , 1);
      }
    
 

  async AddProduct() {
    //console.log(this.fg.value)
    this.fg.value.Images = this.Images;
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.shopservice.PostProduct(this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Added", "success");
        this.router.navigate(['shopowner/shops/'+this.shopId+'/product']);
        console.log(res);

      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
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
    console.log(this.classification)
    this.fg.controls['ClassificationId'].setValue(null);
  }

  validation_messages = {
  
    Name: [{ type: "required", message: "Product Name is required." },
          { type: "pattern", message: "space is not allowed to start."}
  ],
    Description: [
      { type: "required", message: "Description is required." } ,
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
      { type: "required", message: "Brand  is required." },
    ],
    Unit: [
      { type: "required", message: "Unit is required." },
    ],
    Discount:[
      { type: "required", message: "Discount is required"},
      {  type: "max", message: "Discount is 1 to 100%."},
    ]
   
    
  };
  
}
