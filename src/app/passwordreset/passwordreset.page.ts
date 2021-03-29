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
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})
export class PasswordresetPage implements OnInit {

  email = "";
  id: any;
  fg: FormGroup;
  constructor(private fun: FunctionsService, private menuCtrl: MenuController,private loginservice: LoginService,
    private storage: Storage ,private router: Router, private toasterservice: ToastService,
    public loadingController: LoadingController, private sharedservice: SharedService,private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      MobileNumber: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^0[03][0-9]{9}$")
        ])
      ),
    });
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  async reset(){
    // if(this.fun.validateEmail(this.email)){
      this.fg.value.MobileNumber = this.fg.value.MobileNumber.substring(1,11); 
        const loading = await this.loadingController.create({ message: "Loading" });
        await loading.present();
        
            await this.loginservice.forgotPassword((JSON.stringify(this.fg.value.MobileNumber))) //(JSON.stringify(this.fg.value.MobileNumber))
            .subscribe(res => {
              if (res) { 
               this.id = res;
               console.log(this.id);
                loading.dismiss();
                this.toasterservice.create("Code is sent to your email and number", 'success');
                this.router.navigate(['passwordreset/'+res+'/otp']);
              }
              else {
                loading.dismiss();
                this.toasterservice.create("error occored" , 'danger');
              }
            }, (err) => {
              loading.dismiss();
              this.toasterservice.create("Please enter a valid number", 'danger');
            });
    }
    // else{
    //   this.fun.presentToast('Wrong Input!', true, 'bottom', 2100);
    // }
  
  validation_messages = {   
    mobileNumber: [
      { type: "pattern", message: "Number is like 03xxxxxxxxx and length must be 11" }
    ]
  };

}
