/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, DataService } from '../data.service';
import { FunctionsService } from '../functions.service';
import { IonSlides, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  inputs: ['product', 'slider']
})
export class ProductComponent implements OnInit {

  @Input() product;
  @Input() slider: IonSlides;
  @Output() notify: EventEmitter<Number> = new EventEmitter<Number>();
  env = environment;

  slideOpts = {
    effect: 'flip'
  };
  open = [false, false, false, false];
  liked = false;
  constructor(public alertController: AlertController,
    private socialSharing: SocialSharing,
    private fun: FunctionsService, private dataService: DataService) { }

  ngOnInit() {
  }


  toogle(i) {
    this.open[i] = !this.open[i];
  }

  remove() {
    this.slider.lockSwipes(true);
  }

  gainback() {
    this.slider.lockSwipes(false);
  }

  like() {
    console.log('like')
    this.liked = !this.liked;
  }

  shareViaInstagram(img) {
    // Check if sharing via email is supported
    this.socialSharing.canShareVia('instagram').then(() => {
      // Sharing via email is possible
      this.socialSharing.shareViaInstagram('Hey ! Look at the new dress I just bought from Shoppr app. Find more such apps at ', 'www/' + img).then(() => {
        // Success!
      }).catch(() => {
        // Error!
        this.createAlert('Error sharing product via Instagram. Please check if you have Instagram app on the device')
      });
    }).catch(() => {
      // Sharing via email is not possible
      this.createAlert('Could not find Instagram app on the device. Please install Instagram and try again.')
    });
  }

  async createAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Sorry',
      subHeader: 'App not found',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  shareCommon(img) {
    console.log(img);
    this.socialSharing.share('Hey ! Look at the new dress I just bought from MultiStore app.' + this.env.RESOURCE_URL + img ).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
}
