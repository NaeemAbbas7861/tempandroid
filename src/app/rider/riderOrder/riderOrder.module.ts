import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPageRider } from './order.page';
import { Geolocation } from "@ionic-native/geolocation/ngx";

const routes: Routes = [
  {
    path: '',
    component: OrderPageRider
  },
     { path: ':id/items', loadChildren: './items/items.module#ItemssPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderPageRider],
  providers:[Geolocation]
})
export class RiderOrderPageModule {}
