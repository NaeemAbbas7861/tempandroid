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
import { ClassificationService } from 'src/app/services/class.service';
import { Router , ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-editclassification',
  templateUrl: 'editclassification.page.html',
  styleUrls: ['editclassification.page.scss'],
})
export class EditClassificationPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  classification:any;
  uploadProgress: number;
  resourceURL = environment.RESOURCE_URL;
  id = this.route.snapshot.paramMap.get('id');
  id1 = this.route.snapshot.paramMap.get('id1');
  id2 = this.route.snapshot.paramMap.get('id2');
  env = environment;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classificationservice: ClassificationService,
    public loadingController: LoadingController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    // private imagePicker: ImagePicker
    ) {}

    ngOnInit() {
      this.fg = this.formBuilder.group({
        'Id' : [null],
        'Name': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z ]*(?<! )$")]],
        'Description': [null],
        'CategoryId' : [this.id1],
        'Thumbnail': [null],
        'Banner': [null],
      });
    }

  ionViewDidEnter() {
  this.getclassification(this.id2);
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

  async getclassification(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.classificationservice.GetSingleclassification(id).subscribe(
      res => {
        loading.dismiss();
        if (res) {
         console.log(res);
         this.classification = res;
         this.fg.controls['Id'].setValue(this.classification.id);
         this.fg.controls['Name'].setValue(this.classification.name);
         this.fg.controls['Description'].setValue(this.classification.description);
         this.fg.controls['Thumbnail'].setValue(this.classification.thumbnail);
         this.fg.controls['Banner'].setValue(this.classification.banner);
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

  async EditClassification() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.classificationservice.Editclassification(this.id2 , this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Updated", "success");
        this.router.navigate(['./superadmin/group/'+this.id+'/category/'+this.id1+'/classification']);

      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }

 
  validation_messages = {
  
    Name: [{ type: "required", message: "Name is required." },
    { type: "pattern", message: "Name must be without spaces." }],
    Description: [{ type: "required", message: "Description is required." }],

  }

  
}
