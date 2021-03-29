/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit } from '@angular/core'
import { GroupService } from 'src/app/services/group.service';
import { Router , ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-editgroup',
  templateUrl: 'editgroup.page.html',
  styleUrls: ['editgroup.page.scss'],
})
export class EditGroupPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  group:any;
  uploadProgress: number;
  resourceURL = environment.RESOURCE_URL;
  id = this.route.snapshot.paramMap.get('id');
  env = environment;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupservice: GroupService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    // private imagePicker: ImagePicker
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'Id' : [null],
        'Name': [null,  [Validators.required, Validators.pattern("^(?! )[A-Za-z ]*(?<! )$")]],
        'Description': [null],
        'Thumbnail': [null],
        'Banner': [null],
      });

      
    }

  ionViewDidEnter() {
  this.getGroup(this.id);
  }

  preventDefault(e) {
    e.preventDefault();
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

  async getGroup(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.groupservice.GetSingleGroup(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         this.group = res;
         this.fg.controls['Id'].setValue(this.group.id);
         this.fg.controls['Name'].setValue(this.group.name);
         this.fg.controls['Description'].setValue(this.group.description);
         this.fg.controls['Thumbnail'].setValue(this.group.thumbnail);
         this.fg.controls['Banner'].setValue(this.group.banner);
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

  async EditGroup() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.groupservice.EditGroup(this.id, this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Updated", "success");
        this.router.navigate(['superadmin/group']);

      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }

  

  validation_messages = {
  
    Name: [{ type: "required", message: "Name is required." },
    { type: "pattern", message: "Name is without spaces." }],
    Description: [{ type: "required", message: "Description is required." }],

  }
  
}
