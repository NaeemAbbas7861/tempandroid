/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 *
 */
import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../functions.service';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { InfomodalPage } from '../infomodal/infomodal.page';
import { DataService } from '../data.service';
import { SharedService } from 'src/app/services/shared.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController } from "@ionic/angular";
import * as jwt_decode from "jwt-decode";
import { collectExternalReferences } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
  fg: FormGroup;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private fun: FunctionsService,
    private menuCtrl: MenuController,
    private modalController: ModalController,
    private data: DataService,private formBuilder: FormBuilder , private loginservice: LoginService, private sharedservice: SharedService,
    private storage: Storage ,private router: Router, private toasterservice: ToastService, public loadingController: LoadingController) {
  }

  ngOnInit() {
    
    this.fg = this.formBuilder.group({
      'Email_Address': [null ,  Validators.compose([
        Validators.required,
        Validators.pattern(
          "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
        )
      ])],
      'Password':[null, [Validators.required,Validators.minLength(8)]],
    });
  }

  ionViewWillEnter(){
    this.storage.get("IsLoggedIn").then(value=>{
      if (value)
      this.router.navigate(['/home']);
    });
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.splashScreen.hide();
   // this.fun.navigate('home', false);
  }

 async signin() {
 // this.fun.navigate('home', false);
  // original code
  const loading = await this.loadingController.create({ message: "Loading" });
  await loading.present();
    await this.loginservice.Login(this.fg.value)
    .subscribe(res => {
      if (res) {
        loading.dismiss();
        // this.storage.set(environment.USER, res);
        var user = this.getDecodedAccessToken(res.token);
        this.sharedservice.UpdateUser(user);
        this.sharedservice.updatelogin(true);
        this.storage.set("User", user);
        this.storage.set("IsLoggedIn", true);
        this.router.navigate(['/home']);
        
      }
    
    }, (err) => {

     loading.dismiss();
     if(err.message) {
      this.toasterservice.create(err.message, 'danger');
     }
     else if(err.indexOf("unverified") != -1)
     {
        var res=err.split("-")[1];
        this.router.navigate(['/otpverify/'+res]);
        this.storage.set("userid", res);
     }
     else{
      console.log(err);
      this.toasterservice.create('Your account is Disabled');
     }
    });

  }

  async open_modal(b) {
    let modal;
    if (b) {
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.terms_of_use, title: 'Terms of Use' }
      });
    } else {
      modal = await this.modalController.create({
        component: InfomodalPage,
        componentProps: { value: this.data.privacy_policy, title: 'Privacy Policy' }
      });
    }
    return await modal.present();
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  termsOfUse()
  {
    this.router.navigateByUrl('terms');
  }
  validation_messages = {
  
   
    Email_Address: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    mobileNumber: [
      { type: "required", message: "Contact Number is required." },
      { type: "pattern", message: "Number is like 03xxxxxxxxx and length must be 11" }
    ],
    Password:[
      { type:"required", message: "Password is required"},
      { type:"minlength", message: "Password must be 8 character"},
    ],
    
  };
  

}
