import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService {

  private authenticationState = new BehaviorSubject(false);
  private readonly API_Group = `${environment.BASE_URL}group/`;
  constructor(
    protected http: HttpClient
  ) { super(http); }


  GetGroups(): Observable<any> {
    const url = `${this.API_Group}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetSingleGroup(id): Observable<any> {
    const url = `${this.API_Group}${id}`;
    return this.http.get(url, this.httpOptions)
    .pipe(map(this.extractData), catchError(this.handleError));
  }
  
  PostGroup(data): Observable<any> {
    const url = `${this.API_Group}`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  EditGroup(id , data): Observable<any> {
    const url = `${this.API_Group}${id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  DeleteGroup(id): Observable<any> {
    const url = `${this.API_Group}${id}`;
    return this.http.delete(url , this.httpOptions)
    .pipe(catchError(this.handleError));
  }


  putGroup(id: number, data): Observable<any> {
    const url = `${this.API_Group}${id}`;
    return this.http
      .put(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteGroup(id: string): Observable<any> {
    const url = `${this.API_Group}${id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
