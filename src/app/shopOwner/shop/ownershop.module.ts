import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShopPageOwner } from './shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPageOwner
  },
   { path: 'add', loadChildren: './add/addshop.module#AddShopPageModule' },
   { path: 'edit/:id', loadChildren: './edit/editshop.module#EditShopPageModule' },
   { path: ':id/product', loadChildren: './product/product.module#OwnerProductPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopPageOwner]
})
export class OwnerShopPageModule {}
