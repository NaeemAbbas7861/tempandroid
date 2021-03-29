
import { Component, OnInit } from '@angular/core'
import { OrderService } from 'src/app/services/order.service';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editprodcut',
  templateUrl: './editprodcut.page.html',
  styleUrls: ['./editprodcut.page.scss'],

})
export class ReturnprodcutPage implements OnInit {
  
  group:any;
  fg: FormGroup;
  imagepath:string;
  uploadProgress: number;
  id = this.route.snapshot.paramMap.get('id');
  resourceURL = environment.RESOURCE_URL;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderservice: OrderService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    // private imagePicker: ImagePicker
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'id' : [this.id],
        'Name': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9 ]*(?<! )$")]],
        'Price': [null,  [Validators.required, Validators.pattern("^(?! )[0-9 ]*(?<! )$")]],
      
      });
    }

  ionViewDidEnter() {
  this.GetProduct(this.id);
  }

  preventDefault(e) {
    e.preventDefault();
  }
  async GetProduct(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.orderservice.GetReturnedProductbyId(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         this.group = res;
         console.log(res);
         this.fg.controls['Name'].setValue(this.group.name);
         this.fg.controls['Price'].setValue(this.group.price);
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
  // async EditReturnProduct()
  // {
  //   const loading = await this.loadingController.create({ message: "Loading" });
  //   await loading.present();
  //   await this.orderservice.EditProduct(this.id, this.fg.value).subscribe(
  //     res => {
  //       loading.dismiss();
  //       this.toastService.create("Successfully Edit", "success");
  //       this.router.navigate(['superadmin']);

  //     },
  //     err => {
  //       loading.dismiss();
  //       this.toastService.create(err, "danger");
  //     }
  //   );
  // }
  async EditReturnProduct() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.orderservice.EditProduct(this.id, this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Updated", "success");
        this.router.navigate(['superadmin/return-product']);

      },
      err => {
        loading.dismiss();
        this.toastService.create("Name and Price is required", "danger");
      }
    );
  }




 
  validation_messages = {
  
    BrandName: [{ type: "required", message: "Brand Name is required." }],
    Price: [{ type: "required", message: "Price is required." }],

  }
}
