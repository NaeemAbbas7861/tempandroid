import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ApprovedRiderPage } from './approvedrider.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedRiderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApprovedRiderPage]
})
export class ApprovedRiderPageModule {}
