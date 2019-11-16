import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
​
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
​
import endPoints from '../endpoints';
import { environment } from '../../environments/environment';
​
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
​
interface UrlParams {
  key: string;
  value: string | number;
}
​
declare var csrftoken:string;
​
@Injectable()
export class RequestService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
  }
​
  post(urlAlias: string, body, urlParams?: UrlParams, queryParams?: UrlParams[], isAuthorized = true): Observable<Object> {
    let url = endPoints[urlAlias];
    let headers: HttpHeaders =  new HttpHeaders();
    if (isAuthorized) {
      headers = new HttpHeaders().set('Authorization', `${this.sessionService.getToken()}`);
    }
​
    if (urlParams) {
      url = url.replace(`{${urlParams.key}}`, urlParams.value);
    }
​
    if (queryParams) {
      queryParams.forEach((param, index) => {
        const sign = index ? '&' : '?';
        url += `${sign}${param.key}=${param.value}`;
      });
    }
​
    return this.http.post(`${environment.BASE_URL}${url}`, body, { headers })
      .pipe( catchError((error) => {
        if (error.status === 401) {
          this.sessionService.logout();
        }
        return throwError(error);
      }));
  }
​
  get(urlAlias: string, urlParams?: UrlParams, queryParams?: UrlParams[], isAuthorized = true): Observable<Object> {
    let url = endPoints[urlAlias];
    let headers: HttpHeaders;
​
    if (isAuthorized) {
      headers = new HttpHeaders().set('Authorization', `${this.sessionService.getToken()}`);
    }
​
    if (urlParams) {
      url = url.replace(`{${urlParams.key}}`, urlParams.value);
    }
​
    if (queryParams) {
      queryParams.forEach((param, index) => {
        const sign = index ? '&' : '?';
        url += `${sign}${param.key}=${param.value}`;
      });
    }
​
    return this.http.get(`${environment.BASE_URL}${url}`, { headers })
      .pipe( catchError((error) => {
        if (error.status === 401) {
          this.sessionService.logout();
        }
        return throwError(error);
      }));
  }
}