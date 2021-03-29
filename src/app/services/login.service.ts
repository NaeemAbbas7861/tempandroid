import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  public IsLoggedIn = false;

  private authenticationState = new BehaviorSubject(false);
  private readonly API_LOGIN = `${environment.BASE_URL}user/`
  constructor(
    protected http: HttpClient
  ) { super(http); }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  changeState(val: boolean) {
    this.authenticationState.next(val);
  }

  SignUp(data): Observable<any> {
    const url = `${this.API_LOGIN}register`;
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  Login(data): Observable<any> {
    const url = `${this.API_LOGIN}login`;
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetUser(id): Observable<any> {
    const url = `${this.API_LOGIN}${id}`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  resendCode(id): Observable<any> {
    const url = `${this.API_LOGIN}resendCode/${id}`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  UpdateUserStatus(id): Observable<any> {
    const url = `${this.API_LOGIN}Status/${id}`;
    return this.http.put(url,  this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  GetUserData(id): Observable<any> {
    const url = `${this.API_LOGIN}role/${id}`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetShopOwnerData(id): Observable<any> {
    const url = `${this.API_LOGIN}dashboard/byShopowner/data/${id}`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  GetSuperAdminData(): Observable<any> {
    const url = `${this.API_LOGIN}dashboard/data`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  GetRider(): Observable<any> {
    const url = `${this.API_LOGIN}role/4`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  GetApprovedRider(): Observable<any> {
    const url = `${this.API_LOGIN}rider/enabled`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  GetUnApprovedRider(): Observable<any> {
    const url = `${this.API_LOGIN}Rider/disabled`;
    return this.http.get(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
   ChangeRiderstatus(id): Observable<any> {
    const url = `${this.API_LOGIN}status/${id}`;
    return this.http.put(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  RidersStatus(id): Observable<any> {
    const url = `${this.API_LOGIN}/status/${id}`;
    return this.http.put(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  UpdateUser(id , data): Observable<any> {
    const url = `${this.API_LOGIN}${id}/update-profile`;
    return this.http.put(url, data ,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  Verify(id ,  code): Observable<any> {
    const url = `${this.API_LOGIN}${id}/verify`;
    return this.http.post(url, code, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  VerifyReset(id ,  code): Observable<any> {
    const url = `${this.API_LOGIN}${id}/verifypassword`;
    return this.http.post(url, code, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  forgotPassword(data): Observable<any> {
    const url = `${this.API_LOGIN}forget-password`;
    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  ChangePassword(id , data): Observable<any> {
    const url = `${this.API_LOGIN}${id}/change-password`;
    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  changeLoginState(value)
  {
    this.IsLoggedIn = value;
  }

}
