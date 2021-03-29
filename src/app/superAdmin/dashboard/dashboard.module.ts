import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Dashboard } from './dashboard.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    
  ],
  declarations: [Dashboard]
})
export class SuperAdminDashboardModule { }
