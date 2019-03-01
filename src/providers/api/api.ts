import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Headers,RequestOptions } from '@angular/http';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://gateway.api.cloud.wso2.com:443/t/dxc4958/PO_Test/1.0/';
  authToken: string = '0edef49e-f826-303f-acd8-e423e3ab5a1e';
  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
   } 

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    // let headers = new Headers();

    // const securityToken = this.authToken;
    // // let tmp = `Bearer ${securityToken}`;
    // headers.append("Accept", 'application/json');
    // headers.append("Content-Type", 'application/json');
    // headers.append("Authorization", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkeGMgJDM1MDBuZXQiLCJqdGkiOiJhMGE0OGI2ZS0zMGQ1LTRjMzItODI4ZC03M2JkNDYzYTIzNzMiLCJNZW1iZXJzaGlwSWQiOiIzNjYiLCJleHAiOjE1NTA2NjE3MTIsImlzcyI6IlJlY3J1aXRtZW50U3RvcmUuSG9zdCIsImF1ZCI6IlJlY3J1aXRtZW50U3RvcmUuSG9zdCJ9.IyqXI9xfRtoveb7x8pyBYn97Olzk0MPu45XYf9NaHxE');
    return this.http.post(this.url, body, reqOpts);
  
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
