/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Storage } from '@ionic/storage';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx'; 
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { environment } from 'src/environments/environment';
import { LoadingController } from "@ionic/angular";
import { Router } from '@angular/router';
@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.page.html',
  styleUrls: ['./accountsettings.page.scss'],
})
export class AccountsettingsPage implements OnInit {

  content = 'profile'; 
  fg: FormGroup;
  uploading = false;
  resourceURL = environment.RESOURCE_URL;
  user:any;
  items = [
    { name: 'Update Profile', url: '' },
    { name: 'Change Password', url: 'changepassword' },
    { name: 'Deactivate Account', url: 'deactivate' }
  ];

  constructor(private loginservice: LoginService ,private storage: Storage,
    private sharedservice: SharedService ,private formBuilder: FormBuilder , 
    public fun: FunctionsService, private menuCtrl: MenuController, 
    private alertController: AlertController, private nav: NavController,
    private toasterservice: ToastService,
    private router: Router,
     public loadingController: LoadingController,private ref: ChangeDetectorRef ,
     public file: File ,private fileChooser: FileChooser , private transfer: FileTransfer , private filePath: FilePath)  { }


    


  ngOnInit1() {
    
  }
  
  ngOnInit(){

    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(false, 'start');
    this.fg = this.formBuilder.group({
      'Id': [null],
      'UserImage': [null],
      'FirstName': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z ]*(?<! )$")]],
      'LastName': [null, [Validators.required, Validators.pattern("^(?! )[A-Za-z ]*(?<! )$")]],
      'RoleId': [null],
      'CNIC':"",
      'CNIC_Image':[null],
      'Email_Address': [null ,  Validators.compose([
        Validators.required,
        Validators.pattern(
          "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
        )
      ])],
      'Address': [null],
      'Contact_Number':[null,  Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]{10}$")
      ])],
      'Password':[null, [Validators.required,Validators.minLength(8)]],
      'Site_link': "N/A"
    });

    this.storage.get("User").then(value=> {
      this.user = value;
      this.getUserById(value.sid);
    });

  }
async getUserById(id) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.loginservice.GetUser(id).subscribe(
      res => {
         loading.dismiss();
        if (res) {
        // console.log(res);
         this.fg.controls['Id'].setValue(res.id);
         this.fg.controls['FirstName'].setValue(res.firstName);
         this.fg.controls['LastName'].setValue(res.lastName);
         this.fg.controls['RoleId'].setValue(res.roleId);
         this.fg.controls['CNIC'].setValue(res.cnic);
         this.fg.controls['CNIC_Image'].setValue(res.cniC_Image);
         this.fg.controls['Email_Address'].setValue(res.email_Address);
         this.fg.controls['Address'].setValue(res.address);
         this.fg.controls['Contact_Number'].setValue(res.contact_Number);
         this.fg.controls['Password'].setValue(res.password);
         this.fg.controls['Site_link'].setValue(res.site_link);
         this.fg.controls['UserImage'].setValue(res.userImage);
        // this.fg.value.UserImage = res.UserImage;
         
          //  this.ngOnInit();
        } else {
          // loading.dismiss();
          // this.toasterservice.create(res.Message, "danger");
        }
      },
      err => {
        loading.dismiss();
        this.toasterservice.create(err, "danger");
      }
    );
  
}
async updateUser(){
  const loading = await this.loadingController.create({ message: "Loading" });
  await loading.present();

  await this.loginservice.UpdateUser(this.fg.value.Id,this.fg.value).subscribe(res=>{
//this.sharedservice.UpdateUser(res);
this.user.FirstName = this.fg.value.FirstName;
this.user.LastName = this.fg.value.LastName;
this.user.UserImage=this.fg.value.UserImage;
this.storage.set("User" , this.user);
this.sharedservice.UpdateUser(this.user);
loading.dismiss();
this.toasterservice.create('succesfully updated', "success");
this.router.navigateByUrl('/settings');
console.log(res);
  },
      err => {
        loading.dismiss();
        this.toasterservice.create(err, "danger");
      })
}
updateContent(type) {
this.content = type;
}
  async open(i)
  {

    if(this.items[i].url=="deactivate"){
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        message: 'Do you really want to deactivate your account?',
        buttons: [
          {
            text: 'Yes',
            cssClass: 'mycolor',
            handler: (blah) => {
              this.nav.navigateRoot('/login');
            }
          }, {
            text: 'No',
            role: 'cancel',
            cssClass: 'mycolor',
            handler: () => {}
          }
        ]
      });
  
      await alert.present();
    }
    else{
      this.fun.navigate(this.items[i].url,false);
    }
  }

  validation_messages = {
  
    FirstName: [{ type: "required", message: "FirstName is required." }],
    lastName: [{ type: "required", message: "LastName is required." }],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    mobileNumber: [
      { type: "required", message: "MobileNumber is required." },
      { type: "pattern", message: "Mobile number is required like 3331231231" }
    ],
    Address: [
      { type: "required", message: "Address is required." },
    ],
    Type: [
      { type: "required", message: "Account Type is required." },
    ],
    Password:[
      { type:"required", message: "Password is required"},
      { type:"minlength", message: "Password must be 8 character"}
    ]
  };

  UpdatePicture(){
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
                      this.updateUser();
                      this.uploading = false;
                      let dbpath = JSON.parse(data.response)
                      this.fg.controls['UserImage'].setValue(dbpath.dbPath);
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
    
     
}
