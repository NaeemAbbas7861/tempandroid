import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShopPage } from './shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage,
    children:[
      { path: '', redirectTo: 'approved', pathMatch: 'full' },
      { path: 'approved', loadChildren: './approved/approved.module#ApprovedPageModule' },
      { path: 'unapproved', loadChildren: './unapproved/unapproved.module#UnapprovedPageModule' },
      { path: ':id/products'  ,loadChildren: './product/adminproduct.module#AdminProductPageModule'},
      {path: ':id/Viewshops', loadChildren: './Viewshops/Viewshops.module#ViewShopsPageModule'},
    ]
  },
  //{ path: ':id/permissions', loadChildren: './permission/permission.module#PermissionPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopPage]
})
export class SuperAdminShopPageModule {}
