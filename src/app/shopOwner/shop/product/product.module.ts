import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductPageOwner } from './product.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPageOwner
  },
   { path: ':groupId/add', loadChildren: './add/addproduct.module#AddProductPageModule' },
   { path: ':groupId/edit/:proid', loadChildren: './edit/editproduct.module#EditProductPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductPageOwner]
})
export class OwnerProductPageModule {}
