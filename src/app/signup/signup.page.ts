/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MenuController, ModalController } from '@ionic/angular';
import { InfomodalPage } from '../infomodal/infomodal.page';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController } from "@ionic/angular";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx'; 
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Console } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  // first_name = '';
  // last_name = '';
  // email = '';
   uploading = false;
  fg: FormGroup;
  uploadProgress: number;
  resourceURL = environment.RESOURCE_URL;
  role;
  progress:0;

  constructor(private fun:FunctionsService, private menuCtrl: MenuController,
     private modalController: ModalController, private data: DataService , 
     private formBuilder: FormBuilder , private loginservice: LoginService,
     private storage: Storage ,private router: Router, private toasterservice: ToastService,
     public loadingController: LoadingController, private ref: ChangeDetectorRef , 
     public file: File ,private fileChooser: FileChooser , private transfer: FileTransfer , private filePath: FilePath) {
       
  }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      'FirstName': [null, Validators.required],
      'LastName': [null, [Validators.required]],
      'RoleId': [null , Validators.required],
      'CNIC':[],
      'CNIC_Image':[],
      'Email_Address': [null ,  Validators.compose([
        Validators.required,
        Validators.pattern(
          "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
        )
      ])],
      'Address': [null,  Validators.required],
      'Contact_Number':[null,  Validators.compose([
        Validators.required,
        Validators.pattern("^0[03][0-9]{9}$")
      ])],
      'Password':[null, [Validators.required,Validators.minLength(8)]],
      'Site_link': "N/A"
    });
  }

  checkCNIC(){
    if (this.fg.value.RoleId == 2 || this.fg.value.RoleId == 4){
    this.fg.controls['CNIC'].setValidators(Validators.compose([
      Validators.required,
      Validators.pattern("[0-9]{13}$")
    ]));
   
  }
    else 
    this.fg.controls['CNIC'].setValidators(null);
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  async signup(){
    let obj = this.fg.value;
    obj.FirstName = obj.FirstName.trim();
    obj.LastName = obj.LastName.trim();
    obj.Address = obj.Address.trim();
    if(obj.FirstName.length == 0 && obj.LastName.length == 0 && obj.Address.length == 0)
    {
     this.fg.controls['FirstName'].setValue(null);
     this.fg.controls['FirstName'].updateValueAndValidity();
     this.fg.controls['LastName'].setValue(null);
     this.fg.controls['LastName'].updateValueAndValidity();
     this.fg.controls['Address'].setValue(null);
     this.fg.controls['Address'].updateValueAndValidity();
    }
    else if(obj.FirstName.length == 0  && obj.LastName.length == 0 )
    {
      this.fg.controls['FirstName'].setValue(null);
      this.fg.controls['FirstName'].updateValueAndValidity();
      this.fg.controls['LastName'].setValue(null);
      this.fg.controls['LastName'].updateValueAndValidity();
    }
    else if(obj.FirstName.length == 0  && obj.Address.length == 0 )
    {
      this.fg.controls['FirstName'].setValue(null);
      this.fg.controls['FirstName'].updateValueAndValidity();
      this.fg.controls['Address'].setValue(null);
     this.fg.controls['Address'].updateValueAndValidity();
    }
    else if(obj.LastName.length == 0  && obj.Address.length == 0 )
    {
      this.fg.controls['LastName'].setValue(null);
      this.fg.controls['LastName'].updateValueAndValidity();
      this.fg.controls['Address'].setValue(null);
      this.fg.controls['Address'].updateValueAndValidity();
    }
    else if(obj.FirstName.length == 0)
    {
      this.fg.controls['FirstName'].setValue(null);
      this.fg.controls['FirstName'].updateValueAndValidity();
    }
    else if(obj.LastName.length == 0)
    {
      this.fg.controls['LastName'].setValue(null);
      this.fg.controls['LastName'].updateValueAndValidity();
    }
    else if(obj.Address.length == 0)
    {
      this.fg.controls['Address'].setValue(null);
      this.fg.controls['Address'].updateValueAndValidity();
    }
    else{
      this.fg.value.Contact_Number = this.fg.value.Contact_Number.substring(1,11); 
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
      await this.loginservice.SignUp(obj)
      .subscribe(res => {
        if (res) {
          // this.storage.set(environment.USER, res);
          loading.dismiss();
          this.router.navigate(['/otpverify/'+res.id]);
          this.storage.set("userid", res.id);
        }
        else {
          loading.dismiss();
          this.toasterservice.create("exception", 'danger');
        }
      }, (err) => {
        loading.dismiss();
        if (err.indexOf('unverified') != -1)
        {
          var res = err.split("-")[1];
          this.router.navigate(['/otpverify/'+res]);
        }
        else
        this.toasterservice.create(err, 'danger');
        console.log(err)
      });
    
    }
    
   
    
  }

  async open_modal(b){
    let modal;
    if(b){
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.terms_of_use, title: 'Terms of Use' }
      });
    }
    else{
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.privacy_policy, title: 'Privacy Policy' }
      });
    }
    return await modal.present();
  }

 

   uploadCnic() {

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
                      this.toasterservice.create("successfully Uploaded");
                      this.uploading = false;
                      let dbpath = JSON.parse(data.response)
                      this.fg.value.CNIC_Image = dbpath.dbPath;
                      this.ref.detectChanges();
                      //console.log(this.fg.value.cniC_Image);
                    }, (err) => {
                      console.log(err)
                      // error
                    })
                  }
                  else
                  this.toasterservice.create("File size must be less than 200 kb", "danger");
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

  validation_messages = {
  
    FirstName: [{ type: "required", message: "FirstName is required." },
            { type: "pattern", message: "FirstName is empty." },
  ],
    lastName: [
      { type: "required", message: "LastName is required." },
      { type: "pattern", message: "LastName is required." },
  ],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    mobileNumber: [
      { type: "required", message: "Contact Number is required." },
      { type: "pattern", message: "Contact Number is required like 03xxxxxxxxx and length 11 char" }
    ],
    CNIC: [
      { type: "required", message: "CNIC is required." },
      { type: "pattern", message: "CNIC number is required without dashes" }
    ],
    Address: [
      { type: "required", message: "Address is required." },
    ],
    Type: [
      { type: "required", message: "Account Type is required." },
    ],
    Password:[
      { type:"required", message: "Password is required"},
      { type:"minlength", message: "Password must be 8 character"},
    ],
    CNIC_Image:[
      { type:"required", message: "Image is required"},
     
    ],
  };

  termsOfUse()
  {
    this.router.navigateByUrl('terms');
  }

}
