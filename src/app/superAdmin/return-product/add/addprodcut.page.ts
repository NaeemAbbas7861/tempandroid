
import { Component, OnInit } from '@angular/core'
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-addprodcut',
  templateUrl: './addprodcut.page.html',
  styleUrls: ['./addprodcut.page.scss'],

})
export class ReturnprodcutPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  uploadProgress: number;
  resourceURL = environment.RESOURCE_URL;
  constructor(
    private router: Router,
    private orderservice: OrderService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    // private imagePicker: ImagePicker
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'Name': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z0-9 ]*(?<! )$")]],
        'Price': [null,[Validators.required, Validators.pattern("^(?! )[0-9 ]*(?<! )$")]],
      
      });
    }

  ionViewDidEnter() {
  
  }

  preventDefault(e) {
    e.preventDefault();
  }
  async AddReturnProduct() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.orderservice.postreturnedProduct(this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Added", "success");
        this.router.navigate(['superadmin']);

      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }
 


 
  validation_messages = {
  
    BrandName: [{ type: "required", message: "Brand Name is required." }],
    returnPrice: [{ type: "required", message: "Price is required." }],

  }
}
