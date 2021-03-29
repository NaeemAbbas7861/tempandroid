import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminPage } from './superadmin.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: SuperAdminPage
  }, 
       { path: 'group', loadChildren: './group/group.module#GroupPageModule' },
       { path: 'shop', loadChildren: './shop/shop.module#SuperAdminShopPageModule' },
       { path: 'earning', loadChildren: './earning/earning.module#EarningPageModule' },
       { path: 'rider', loadChildren: './ridersadmin/ridersadmin.module#SuperAdminRiderPageModule'},
       { path: ':id/shopearning', loadChildren: './shopearning/shopearning.module#ShopEarningPageModule'},
       { path: 'user', loadChildren: './user/user.module#UserPageModule'},
       {path: 'view-orders', loadChildren: './view-orders/view-orders.module#OwnerOrderPageModule'},
       {path: 'return-product', loadChildren: './return-product/return-product.module#ReturnProductPageModule'},
       { path: 'dashboard', loadChildren: './dashboard/dashboard.module#SuperAdminDashboardModule'},
 
   

      // { path: 'orders', loadChildren: './orders/vieworders.module#OwnerOrderPageModule'},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
