import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopOwnerPage } from './shopowner.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ShopOwnerPage
  }, 
      //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
     { path: 'dashboard', loadChildren: './dashboard/dashboard.module#ShopOwnerDashBoardPage' },
       { path: 'order/:type', loadChildren: './order/order.module#OwnerOrderPageModule' },
       { path: 'order/:new', loadChildren: './order/order.module#OwnerOrderPageModule' },
       { path: 'order/:update', loadChildren: './order/order.module#OwnerOrderPageModule' },
       { path: 'order/:cancel', loadChildren: './order/order.module#OwnerOrderPageModule' },
       { path: 'shops', loadChildren: './shop/ownershop.module#OwnerShopPageModule' },   
       {path: 'list-of-product', loadChildren: './list-of-product/list-of-product.module#ListOfProductPageModule'},


 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopOwnerRoutingModule { }
