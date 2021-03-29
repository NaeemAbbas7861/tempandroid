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
//import { FunctionsService } from '../functions.service';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-passwordreset',
  templateUrl: './otp_verify.page.html',
  styleUrls: ['./otp_verify.page.scss'],
})
export class OtpverifyresetPage implements OnInit {

  email = "";
  Password = "";
  otp = true;
  otp5;otp6;otp7;otp8;
  id = this.route.snapshot.paramMap.get('id');

  constructor( private menuCtrl: MenuController,
    private loginservice: LoginService,
     private storage: Storage ,private router: Router, private toasterservice: ToastService,
     public loadingController: LoadingController, private route: ActivatedRoute, private sharedservice: SharedService) { 
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
  }

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
  }

  async verify(){
    let code = this.otp5+this.otp6+this.otp7+this.otp8;
    // var code1: number = +code;
    let code1 = parseInt(code);
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
        await this.loginservice.VerifyReset(this.id , code1)
        .subscribe(res => {
          loading.dismiss();
            console.log(res);
            this.otp=false;
        }, (err) => {
          loading.dismiss();
          this.toasterservice.create("Please Enter Valid OTP", 'danger');
        });
    }

    async UpdatePassword(){
      let code = this.otp5+this.otp6+this.otp7+this.otp8;
      // var code1: number = +code;
      let code1 = parseInt(code);
      let data={password: this.Password}
      const loading = await this.loadingController.create({ message: "Loading" });
      await loading.present();
          await this.loginservice.ChangePassword(this.id , data)
          .subscribe(res => {  
              loading.dismiss();
              this.toasterservice.create("Password updated successfully", 'success');
              this.router.navigate(['login']);
            
          }, (err) => {
            loading.dismiss();
            this.toasterservice.create(err, 'danger');
          });
      }

    getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
    }

}
