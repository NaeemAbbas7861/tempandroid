import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnProductPageRoutingModule } from './return-product-routing.module';

import { ReturnProductPage } from './return-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnProductPageRoutingModule
  ],
  declarations: [ReturnProductPage]
})
export class ReturnProductPageModule {}
