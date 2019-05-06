import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

 baseUrl: String = 'http://localhost:8081/';

  constructor() { }

  getLoginUrl(){
    return this.baseUrl + "";
  }
}
