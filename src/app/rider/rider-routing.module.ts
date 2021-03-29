import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderPage } from './rider.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: RiderPage
  }, 
  
       { path: 'orders/:type', loadChildren: './riderOrder/riderOrder.module#RiderOrderPageModule' },
       { path: 'dashboard', loadChildren: './dashboard/dashboard.module#RiderDashBoardPage' },
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderRoutingModule { }
