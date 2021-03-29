import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShopOwnerPage } from './shopowner.page';
import { ShopOwnerRoutingModule } from './shopowner-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShopOwnerRoutingModule
  ],
  declarations: [ShopOwnerPage]
})
export class ShopOwnerPageModule { }
