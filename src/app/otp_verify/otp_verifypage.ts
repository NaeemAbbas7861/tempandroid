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
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './otp_verify.page.html',
  styleUrls: ['./otp_verify.page.scss'],
})
export class OtpverifyPage implements OnInit {

  email = "";
  id:any;
  cd1: any;
  otp5;otp6;otp7;otp8;
  settimer: boolean = false;
  buttonDisabled: boolean;

  constructor(private fun: FunctionsService, private menuCtrl: MenuController,
    private loginservice: LoginService,
     private storage: Storage ,private router: Router, private toasterservice: ToastService,
     public loadingController: LoadingController, private route: ActivatedRoute, private sharedservice: SharedService) { 
  }

  ngOnInit() {
    setTimeout(() => {
      this.buttonDisabled = false;   
    }, 60000);

  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
     this.storage.get("userid").then(value=> {
      this.id=value;
      console.log(value);
     });
    
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
    let id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
        await this.loginservice.Verify(id , code1)
        .subscribe(res => {
          if (res) { 
            var user = this.getDecodedAccessToken(res.token);

            this.storage.set("User", user);
            this.sharedservice.UpdateUser(user);
            this.sharedservice.updatelogin(true);
            this.storage.set("IsLoggedIn", true);
            this.toasterservice.create("Welcome to Kuick Save", 'success');
            this.router.navigate(['/home']);
            this.storage.remove('userid');
            loading.dismiss();
          }
          else {
            loading.dismiss();
            this.toasterservice.create("Invalid Verification  Code", 'danger');

          }
        }, (err) => {
          loading.dismiss();
          this.toasterservice.create("Invalid Verification Code", 'danger');
        });
    }

    async resendMessage()
  {
    this.buttonDisabled=!this.buttonDisabled;
    const loading = await this.loadingController.create({ message: "Loading" });
    loading.present();
    await this.loginservice.resendCode(this.id).subscribe(
        res=>{
          this.toasterservice.create("Message resend Successfully", 'success');    
          loading.dismiss();
          setTimeout(() => {
            this.buttonDisabled = false;   
          }, 60000);    
      });
      (err) =>{
        loading.dismiss();
      }

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
