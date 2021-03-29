import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnProductPage } from './return-product.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnProductPage
  },
  { path: 'add', loadChildren: './add/addprodcut.module#ReturnAddprodcutPageModule' },
  { path: 'edit/:id', loadChildren: './edit/editprodcut.module#ReturnEditprodcutPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnProductPageRoutingModule {}
