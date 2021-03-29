import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnapprovedRiderPage } from './unapprovedrider.page';

const routes: Routes = [
  {
    path: '',
    component: UnapprovedRiderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnapprovedRiderPage]
})
export class UnapprovedRiderPageModule {}
