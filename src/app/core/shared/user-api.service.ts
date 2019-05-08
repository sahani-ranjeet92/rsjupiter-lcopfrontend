import {environment} from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

private baseUrl = environment.BASE_API_URL + '/lco-user';

  constructor() { }

  getLoginUrl(){
    return this.baseUrl + "/getUser";
  }
}
