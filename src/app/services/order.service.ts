import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  private authenticationState = new BehaviorSubject(false);
  private readonly API_ORDER = `${environment.BASE_URL}order/`;
  private readonly API_EARNING= `${environment.BASE_URL}earning/`;
  private readonly API_RETURNDISCOUNT= `${environment.BASE_URL}returnedproduct/`;
 // private readonly API_PRODUCT = `${environment.BASE_URL}product/`
  constructor(
    protected http: HttpClient
  ) { super(http); }


  GetCustomerOrders(id): Observable<any> {
    const url = `${this.API_ORDER}user/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  Getreturnedproduct(): Observable<any> {
    const url = `${this.API_RETURNDISCOUNT}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  GetReturnedProductbyId(id): Observable<any> {
    const url = `${this.API_RETURNDISCOUNT}${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  DeleteProduct(id): Observable<any> {
    const url = `${this.API_RETURNDISCOUNT}${id}`;
    return this.http.delete(url , this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  postreturnedProduct(data): Observable<any> {
    const url = `${this.API_RETURNDISCOUNT}`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  EditProduct(id , data): Observable<any> {
    const url = `${this.API_RETURNDISCOUNT}${id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  
  GetOrderItems(id): Observable<any> {
    const url = `${this.API_ORDER}${id}/orderitems`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  Allorders(): Observable<any> {
    const url = `${this.API_ORDER}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  riderDashboard(id): Observable<any> {
    const url = `${this.API_ORDER}rider/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetOrder(id): Observable<any> {
    const url = `${this.API_ORDER}${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  GetCustomerOrder(id): Observable<any> {
    const url = `${this.API_ORDER}customer/${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetUserShopOrders(id): Observable<any> {
   // const url = `${this.API_ORDER}usershop/${id}`;
    const url = `${this.API_ORDER}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  GetNewUserShopOrders(id): Observable<any> {
    const url = `${this.API_ORDER}usershop/${id}/0`;
     ///const url = `${this.API_ORDER}`;
     return this.http.get(url, this.httpOptions)
     .pipe(map(this.extractData), catchError(this.handleError));
   }

   GetPendingUserShopOrders(id): Observable<any> {
     const url = `${this.API_ORDER}usershop/${id}/1`;
     
     return this.http.get(url, this.httpOptions)
     .pipe(map(this.extractData), catchError(this.handleError));
   }
   GetCompleteUserShopOrders(id): Observable<any> {
     const url = `${this.API_ORDER}usershop/${id}/2`;
     return this.http.get(url, this.httpOptions)
     .pipe(map(this.extractData), catchError(this.handleError));
   }
   GetCancelUserShopOrders(id): Observable<any> {
     const url = `${this.API_ORDER}usershop/${id}/3`;
     
     return this.http.get(url, this.httpOptions)
     .pipe(map(this.extractData), catchError(this.handleError));
   }

  GetNewRiderOrders(lat , lng): Observable<any> {
     const url = `${this.API_ORDER}${lat}/${lng}`;
     return this.http.get(url, this.httpOptions)
     .pipe(map(this.extractData), catchError(this.handleError));
   }

   GetRiderOrdersByStatus(id , status): Observable<any> {
    const url = `${this.API_ORDER}rider/${id}/${status}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  PostOrder(data): Observable<any> {
    const url = `${this.API_ORDER}`;
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  PutOrder(id , data): Observable<any> {
    const url = `${this.API_ORDER}${id}`;
    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  MarksReceived(id): Observable<any> {
    const url = `${this.API_ORDER}${id}/markreceived`;
    return this.http.put(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  AcceptOrder(id , riderid , status): Observable<any> {
    const url = `${this.API_ORDER}${id}/${riderid}/${status}`;
    return this.http.put(url , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  CancelOrder(id , status): Observable<any> {
    const url = `${this.API_ORDER}${id}/changestatus/${status}`;
    return this.http.put(url , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  OrderCompletionCode(id,ordercode, status ): Observable<any> {
    const url = `${this.API_ORDER}complete/${id}/${ordercode}/${status}`;
    return this.http.put(url , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  GetEarning(date): Observable<any> {
    const url = `${this.API_EARNING}superadmin/${date}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  GetEarningDatetoDate(date,date1): Observable<any> {
    const url = `${this.API_EARNING}superadmin/${date}/${date1}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  DownloadEarningDatetoDate(date,date1): Observable<any> {
    const url = `${this.API_EARNING}downloadcsv/${date}/${date1}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetShopEarning(id,date): Observable<any> {
    const url = `${this.API_EARNING}shopowner/${id}/${date}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

}
