import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService extends BaseService {

  private authenticationState = new BehaviorSubject(false);
  private readonly API_classification = `${environment.BASE_URL}classification/`;
  constructor(
    protected http: HttpClient
  ) { super(http); }


  Getclassifications(): Observable<any> {
    const url = `${this.API_classification}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetSingleclassification(id): Observable<any> {
    const url = `${this.API_classification}${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  
  Postclassification(data): Observable<any> {
    const url = `${this.API_classification}`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  Editclassification(id , data): Observable<any> {
    const url = `${this.API_classification}${id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  Deleteclassification(id): Observable<any> {
    const url = `${this.API_classification}${id}`;
    return this.http.delete(url , this.httpOptions)
    .pipe(catchError(this.handleError));
  }

}
