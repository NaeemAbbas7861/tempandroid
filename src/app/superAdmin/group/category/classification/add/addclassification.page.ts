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
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-addclassification',
  templateUrl: 'addclassification.page.html',
  styleUrls: ['addclassification.page.scss'],
})
export class AddClassificationPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  uploadProgress: number;
  resourceURL = environment.RESOURCE_URL;
  id1 = this.route.snapshot.paramMap.get('id1');
  id = this.route.snapshot.paramMap.get('id');
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
        'Name': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z ]*(?<! )$")]],
        'Description': [null],
        'CategoryId': [this.id1],
        'Thumbnail': [null],
        'Banner': [null],
      });
    }

  ionViewDidEnter() {
  
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


  async AddClassification() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.classificationservice.Postclassification(this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Added", "success");
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
