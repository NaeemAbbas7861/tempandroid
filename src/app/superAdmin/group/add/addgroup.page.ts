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
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { ImagePicker , ImagePickerOptions } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-addgroup',
  templateUrl: 'addgroup.page.html',
  styleUrls: ['addgroup.page.scss'],
})
export class AddGroupPage implements OnInit {

  fg: FormGroup;
  imagepath:string;
  uploadProgress: number;
  resourceURL = environment.RESOURCE_URL;
  constructor(
    private router: Router,
    private groupservice: GroupService,
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


  async AddGroup() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.groupservice.PostGroup(this.fg.value).subscribe(
      res => {
        loading.dismiss();
        this.toastService.create("Successfully Added", "success");
        this.router.navigate(['superadmin/group']);

      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }

  // public uploadThumbnail = files => {
  //   if (files.length === 0) {
  //     return;
  //   }
  //   const fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);

  //   this.http.post(environment.BASE_URL + 'upload', formData, { reportProgress: true, observe: 'events' }).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       this.uploadProgress = Math.round((100 * event.loaded) / event.total);
  //     } else if (event.type === HttpEventType.Response) {
  //       this.fg.value.Thumbnail = event.body['dbPath'];
  //     }
  //   });
  // }

  // public uploadBanner = files => {
  //   if (files.length === 0) {
  //     return;
  //   }
  //   const fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);

  //   this.http.post(environment.BASE_URL + 'upload', formData, { reportProgress: true, observe: 'events' }).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       this.uploadProgress = Math.round((100 * event.loaded) / event.total);
  //     } else if (event.type === HttpEventType.Response) {
  //       this.fg.value.Banner = event.body['dbPath'];
  //     }
  //   });
  // }
  validation_messages = {
  
    Name: [{ type: "required", message: "Name is required." },
    { type: "pattern", message: "Name must be without spaces." }],

    Description: [{ type: "required", message: "Description is required." }],

  }
}
