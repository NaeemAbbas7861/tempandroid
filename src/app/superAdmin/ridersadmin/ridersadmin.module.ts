import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RidersAdminPage } from './ridersadmin.page';

const routes: Routes = [
  {
    path: '',
    component: RidersAdminPage,
    children:[
      { path: '', redirectTo: 'approved', pathMatch: 'full' },
      { path: 'approved', loadChildren: './approved/approvedrider.module#ApprovedRiderPageModule' },
     { path: 'unapproved', loadChildren: './unapproved/unapprovedrider.module#UnapprovedRiderPageModule' },
     // { path: ':id/products'  ,loadChildren: './product/adminproduct.module#AdminProductPageModule'}
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
  declarations: [RidersAdminPage]
})
export class SuperAdminRiderPageModule {}
