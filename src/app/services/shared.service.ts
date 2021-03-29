import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService extends BaseService {

  private authenticationState = new BehaviorSubject(false);
  isloggedin = false;
  user:any = {RoleName: 'Customer' , FirstName: "Guest" , LastName: "User"};
   public appPages = [
    { title: 'Dashboard', url: '/home', icon: 'apps' },
    { title: 'Shopping Cart', url: '/cart', icon: 'cart' },
    { title: 'Order History', url: '/orders', icon: 'list' },
    // { title: 'Rewards', url: '/rewards', icon: 'trophy' },
    // { title: 'Apply Promo', url: '/applypromo', icon: 'megaphone' }
  ];
 
  constructor(
    protected http: HttpClient
  ) { super(http); }

updatelogin(value){
this.isloggedin = value;
}
  UpdateUser(data) {
    this.user = data ;
    if (data.RoleName == 'SuperAdmin')
    this.appPages=[
      { title: 'Dashboard', url: '/superadmin/dashboard', icon: 'apps' },
      // { title: 'Notifications', url: '/notification', icon: 'notifications' },
      { title: 'Category', url: '/superadmin/group', icon: 'home' },
      { title: 'Shop Requests', url: '/superadmin/shop', icon: 'medkit-outline' },
      { title: 'Riders', url: '/superadmin/rider', icon: 'bicycle-outline' },
      { title: 'Earning', url:'/superadmin/earning', icon:'cash' },
      { title: 'Users', url:'/superadmin/user', icon:'people-outline' },
      { title: 'Orders', url:'/superadmin/view-orders', icon:'newspaper-outline' },
      { title: 'Return Items', url:'/superadmin/return-product', icon:'duplicate-outline' },
      //{ title: 'Order', url: '/superadmin/order', icon: 'reorder-three-outline' }
    ];
   
    if (data.RoleName == 'ShopOwner')
    this.appPages=[
      { title: 'Dashboard', url: '/shopowner/dashboard', icon: 'apps' },
      // { title: 'Search', url: '/search', modal: true, icon: 'search' },
      // { title: 'Notifications', url: '/notification', icon: 'notifications' },
      { title: 'Shops', url: '/shopowner/shops', icon: 'medkit-outline' },
      { title: 'Product List', url: '/shopowner/list-of-product', icon: 'medkit-outline' },
      { title: 'New Orders', url: '/shopowner/order/new', icon: 'duplicate-outline' },
      { title: 'Pending Orders', url: '/shopowner/order/pending', icon: 'newspaper-outline' },
      { title: 'Completed Orders', url: '/shopowner/order/complete', icon: 'checkmark-done-circle-outline' },
      { title: 'Cancel Orders', url: '/shopowner/order/cancel', icon: 'close-circle-outline' },

    ];
    if (data.RoleName == 'Rider')
    this.appPages=[
      { title: 'Dashboard', url: '/rider/dashboard', icon: 'apps' },
      { title: 'New Orders', url: '/rider/orders/new', icon: 'duplicate-outline' },
      { title: 'Pending Orders', url: '/rider/orders/pending', icon: 'newspaper-outline' },
      { title: 'Complete Orders', url: '/rider/orders/completed', icon: 'checkmark-done-circle-outline' },
    ];
    if (data.RoleName == 'Customer')
    this.appPages=[
    { title: 'Dashboard', url: '/home', icon: 'apps' },
    { title: 'Shopping Cart', url: '/cart', icon: 'cart' },
    { title: 'Order History', url: '/orders', icon: 'list' },
    ];

  }

}
