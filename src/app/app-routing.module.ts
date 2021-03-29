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
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'passwordreset', loadChildren: './passwordreset/passwordreset.module#PasswordresetPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'productdetail/:id/:preview', loadChildren: './productdetail/productdetail.module#ProductdetailPageModule' },
  { path: 'productlist', loadChildren: './productlist/productlist.module#ProductlistPageModule' },
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  
  
 
  { path: 'Checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
 
 
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'orderinfo', loadChildren: './orderinfo/orderinfo.module#OrderinfoPageModule' },
  { path: 'faqs', loadChildren: './faqs/faqs.module#FaqsPageModule' },
  { path: 'faq', loadChildren: './faq/faq.module#FaqPageModule' },
  
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  
  { path: 'managepayments', loadChildren: './managepayments/managepayments.module#ManagepaymentsPageModule' },
  { path: 'newpayment', loadChildren: './newpayment/newpayment.module#NewpaymentPageModule' },
  { path: 'datacontrol', loadChildren: './datacontrol/datacontrol.module#DatacontrolPageModule' },
 
  { path: 'accountsettings', loadChildren: './accountsettings/accountsettings.module#AccountsettingsPageModule' },
  
  
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'shopproducts/:id', loadChildren: './shopproducts/shopproducts.module#ShopProductsPageModule' },
  { path: 'otpverify/:id', loadChildren: './otp_verify/otp_verify.module#OtpverifyPageModule' },
   { path: 'superadmingroup', loadChildren: './superAdmin/group/group.module#GroupPageModule' },
  { path: 'superadmin', loadChildren: './superAdmin/superadmin.module#SuperAdminPageModule' },
  { path: 'shopowner', loadChildren: './shopOwner/shopowner.module#ShopOwnerPageModule' },
  { path: 'rider', loadChildren: './rider/rider.module#RiderPageModule'},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
