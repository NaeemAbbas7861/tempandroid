/**
 * Shoppr - E-commerce app starter Ionic 4(https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { GroupPage } from './group.page';


const routes: Routes = [
  {
    path: '',
    component: GroupPage
  },
  { path: 'add', loadChildren: './add/addgroup.module#AddGroupPageModule' },
  { path: 'edit/:id', loadChildren: './edit/editgroup.module#EditGroupPageModule' },
  { path: ':id/category', loadChildren: './category/category.module#CategoryPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupPage
  ],
  entryComponents: []
})
export class GroupPageModule {}
