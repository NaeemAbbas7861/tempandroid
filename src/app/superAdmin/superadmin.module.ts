import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SuperAdminPage } from './superadmin.page';
import { SuperAdminRoutingModule } from './superadmin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SuperAdminRoutingModule
  ],
  declarations: [SuperAdminPage]
})
export class SuperAdminPageModule { }
