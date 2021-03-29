import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemsPage } from './item.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  },
  // { path: 'add', loadChildren: './add/addshop.module#AddShopPageModule' },
   //{ path: 'edit/:id', loadChildren: './edit/editshop.module#EditShopPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemsPage]
})
export class ItemssPageModule {}
