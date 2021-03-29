import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends BaseService {

  private authenticationState = new BehaviorSubject(false);
  private readonly API_SHOP = `${environment.BASE_URL}shop/`;
  private readonly API_PRODUCT = `${environment.BASE_URL}product/`
  private readonly API_BANK = `${environment.BASE_URL}bank/`
  constructor(
    protected http: HttpClient
  ) { super(http); }


  GetShops(lat,lng): Observable<any> {
    const url = `${this.API_SHOP}${lat}/${lng}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetShopsByCategory(groupid,lat,lng): Observable<any> {
    const url = `${this.API_SHOP}${lat}/${lng}/${groupid}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  GetSingleShopByName(): Observable<any> {
    const url = `${this.API_SHOP}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  
  getApprovedShops(): Observable<any> {
    const url = `${this.API_SHOP}verified`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  getUnApprovedShops(): Observable<any> {
    const url = `${this.API_SHOP}unverfied`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  getShopsByUser(id): Observable<any> {
    const url = `${this.API_SHOP}user/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  ApproveShop(id , data): Observable<any> {
    const url = `${this.API_SHOP}${id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  UpdateShop(id , data): Observable<any> {
    const url = `${this.API_SHOP}${id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  UpdateProduct(id , data): Observable<any> {
    const url = `${this.API_PRODUCT}${id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  GetShopProducts(id): Observable<any> {
    const url = `${this.API_SHOP}${id}/products`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  
  GetShopByProducts(id): Observable<any> {
    const url = `${this.API_SHOP}products/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  GetShopByuserProducts(id): Observable<any> {
    const url = `${this.API_PRODUCT}userProduct/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  

  GetShop(id): Observable<any> {
    const url = `${this.API_SHOP}${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  
  
  GetProductDetail(id): Observable<any> {
    const url = `${this.API_PRODUCT}${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  PostShop(data): Observable<any> {
    const url = `${this.API_SHOP}`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  PostProduct(data): Observable<any> {
    const url = `${this.API_PRODUCT}`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  GetProduct(): Observable<any> {
    const url = `${this.API_PRODUCT}`;
    return this.http.get(url,  this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  DeleteProductbyId(id): Observable<any> {
    const url =`${this.API_PRODUCT}${id}`;
    return this.http.delete(url,  this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  DeleteShop(id): Observable<any> {
    const url =`${this.API_SHOP}${id}`;
    return this.http.delete(url,  this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  GetBank(): Observable<any> {
    const url = `${this.API_BANK}`;
    return this.http.get(url,  this.httpOptions)
    .pipe(catchError(this.handleError));
  }


}
