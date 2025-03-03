import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private httpClientService: HttpClient, @Inject("baseUrl") private baseUrl: string ) { }

  private generateUrl(requestParameters: Partial<RequestParameters>) : string {
    let url = `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ''}`;

    return url;
  }

  get<T>(requestParameters : Partial<RequestParameters>, id?: string) : Observable<T> {
    let url : string = "";

    if(requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    }
    else {
    url = `${this.generateUrl(requestParameters)}${id ? `/${id}` : ''}`;
    }

    return this.httpClientService.get<T>(url, { headers: requestParameters.headers });
  }

  post<T>(requestParameters : Partial<RequestParameters>, body: Partial<T>) : Observable<T> {
    let url : string = "";

    if(requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    }
    else {
    url = `${this.generateUrl(requestParameters)}`;
    }

    return this.httpClientService.post<T>(url, body, { headers: requestParameters.headers });
  }

  put<T>(requestParameters : Partial<RequestParameters>, body: Partial<T>) : Observable<T>{
    let url : string = "";

    if(requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    }
    else {
    url = `${this.generateUrl(requestParameters)}`;
    }

    return this.httpClientService.put<T>(url, body, { headers: requestParameters.headers });
  }

  delete<T>(requestParameters : Partial<RequestParameters>, id: string) : Observable<T> {

    debugger;
    let url : string = "";

    if(requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    }
    else {
    url = `${this.generateUrl(requestParameters)}/${id}`;
    }
    
    return this.httpClientService.delete<T>(url, { headers: requestParameters.headers });
  }
}

export class RequestParameters {
  controller? : string;
  action ?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndpoint?: string;
}
