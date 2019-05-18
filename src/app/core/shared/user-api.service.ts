import {environment} from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

private baseUrl = environment.BASE_API_URL;

  constructor() { }

  getLoginUrl(){
    return this.baseUrl + "'/lco-user/getUser";
  }

  getAllChannelListUrl(){
    return this.baseUrl + "/product/getProductList";
  }

}
