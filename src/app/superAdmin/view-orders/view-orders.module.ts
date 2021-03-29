import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderPageOwner } from './view-orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPageOwner
  },
    { path: ':id/items', loadChildren: './items/view-item.module#ItemsPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderPageOwner]
})
export class OwnerOrderPageModule {}
