import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPageOwner } from './order.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPageOwner
  },
    { path: ':id/items', loadChildren: './items/item.module#ItemsPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderPageOwner]
})
export class OwnerOrderPageModule {}
