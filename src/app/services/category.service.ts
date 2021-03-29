import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  private authenticationState = new BehaviorSubject(false);
  private readonly API_Category = `${environment.BASE_URL}category/`;
  constructor(
    protected http: HttpClient
  ) { super(http); }


  Getcategorys(): Observable<any> {
    const url = `${this.API_Category}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetSinglecategory(id): Observable<any> {
    const url = `${this.API_Category}${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  
  Postcategory(data): Observable<any> {
    const url = `${this.API_Category}`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  Editcategory(id , data): Observable<any> {
    const url = `${this.API_Category}${id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  Deletecategory(id): Observable<any> {
    const url = `${this.API_Category}${id}`;
    return this.http.delete(url , this.httpOptions)
    .pipe(catchError(this.handleError));
  }

}
