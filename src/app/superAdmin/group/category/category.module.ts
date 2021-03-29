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
import { CategoryPage } from './category.page';


const routes: Routes = [
  {
    path: '',
    component: CategoryPage
  },
  { path: 'add', loadChildren: './add/addcategory.module#AddCategoryPageModule' },
  { path: 'edit/:id1', loadChildren: './edit/editcategory.module#EditCategoryPageModule' },
  { path: ':id1/classification', loadChildren: './classification/classification.module#ClassificationPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoryPage
  ],
  entryComponents: []
})
export class CategoryPageModule {}
