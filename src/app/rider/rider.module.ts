import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RiderPage } from './rider.page';
import { RiderRoutingModule } from './rider-routing.module';
import { Geolocation } from "@ionic-native/geolocation/ngx";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RiderRoutingModule
  ],
  declarations: [RiderPage],
  providers:[Geolocation],
  entryComponents: []
})
export class RiderPageModule { }
