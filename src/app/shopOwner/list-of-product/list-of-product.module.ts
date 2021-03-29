import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOfProductPageRoutingModule } from './list-of-product-routing.module';

import { ListOfProductPage } from './list-of-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfProductPageRoutingModule
  ],
  declarations: [ListOfProductPage]
})
export class ListOfProductPageModule {}
